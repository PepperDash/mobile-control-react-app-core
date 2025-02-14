#!/usr/bin/env python3
import os
import re
from typing import Dict, List, Optional, Any
from dataclasses import dataclass

@dataclass
class DocItem:
    name: str
    kind: str  # 'hook', 'interface', 'class', 'function', 'type'
    description: str
    params: List[Dict[str, str]]
    returns: Optional[str]
    examples: List[str]
    source_file: str
    category: str
    group: str
    definition: Optional[Dict[str, Any]] = None

class TSDocGenerator:
    def __init__(self, src_dir: str, output_dir: str):
        self.src_dir = src_dir
        self.output_dir = output_dir
        self.docs: List[DocItem] = []

    def parse_file(self, file_path: str) -> None:
        """Parse a TypeScript/React file and extract documentation."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract interface/class definitions with better pattern matching
        interface_pattern = r'(?:export\s+)?(?:interface|class|type)\s+(\w+)(?:\s+extends\s+[^{]+)?\s*{([^}]+)}'
        interface_matches = re.finditer(interface_pattern, content, re.MULTILINE | re.DOTALL)
        interface_defs = {}
        for m in interface_matches:
            name = m.group(1)
            definition = self._parse_interface_definition(m.group(2))
            if definition:  # Only add if we got a valid definition
                interface_defs[name] = definition

        # Extract JSDoc comments and associated code
        doc_blocks = re.finditer(
            r'/\*\*\s*(.*?)\s*\*/\s*(?:export\s+)?(?:function|class|interface|type)?\s*(\w+)',
            content,
            re.DOTALL
        )

        for block in doc_blocks:
            comment = block.group(1)
            name = block.group(2)
            
            if not name:
                continue

            # Parse the documentation block
            doc_item = self._parse_doc_block(comment, name, file_path)
            if doc_item:
                # Add interface/class definition if available
                if name in interface_defs:
                    doc_item.definition = interface_defs[name]
                self.docs.append(doc_item)

    def _parse_interface_definition(self, content: str) -> Dict[str, Any]:
        """Parse interface/class definition content."""
        properties = {}
        # Match property definitions with better pattern
        # Handles optional properties (?) and required properties (!)
        prop_pattern = r'(?:readonly\s+)?(\w+)\s*[?!]?\s*:\s*([^;}\n]+)'
        for match in re.finditer(prop_pattern, content):
            name, type_def = match.groups()
            # Clean up the type definition
            type_def = re.sub(r'\s+', ' ', type_def.strip())
            properties[name.strip()] = type_def
        return properties

    def _parse_doc_block(self, comment: str, name: str, file_path: str) -> Optional[DocItem]:
        """Parse a documentation block into a DocItem."""
        lines = [line.strip(' *') for line in comment.split('\n')]
        
        description = []
        params = []
        returns = None
        examples = []
        category = "Uncategorized"
        group = "Other"
        in_example = False
        current_example = []

        for line in lines:
            line = line.strip()
            if not line:
                continue

            if line.startswith('@param'):
                param_match = re.match(r'@param\s+{(.+?)}\s+(\w+)\s*-?\s*(.*)', line)
                if param_match:
                    params.append({
                        'type': param_match.group(1),
                        'name': param_match.group(2),
                        'description': param_match.group(3)
                    })
            elif line.startswith('@returns'):
                returns_match = re.match(r'@returns\s+{(.+?)}\s*(.*)', line)
                if returns_match:
                    returns = {
                        'type': returns_match.group(1),
                        'description': returns_match.group(2)
                    }
            elif line.startswith('@example'):
                in_example = True
                current_example = []
            elif line.startswith('@category'):
                category = line.replace('@category', '').strip()
            elif line.startswith('@group'):
                group = line.replace('@group', '').strip()
            elif in_example:
                if line.startswith('@'):
                    in_example = False
                    if current_example:
                        examples.append('\n'.join(current_example))
                    current_example = []
                else:
                    current_example.append(line)
            elif not line.startswith('@'):
                description.append(line)

        if current_example:
            examples.append('\n'.join(current_example))

        # Determine the kind based on the name and common patterns
        kind = 'function'
        if name.startswith('I') and name[1].isupper():
            kind = 'interface'
        elif name[0].isupper():
            kind = 'class'
        elif name.startswith('use'):
            kind = 'hook'
        elif 'type' in name.lower() or 'enum' in name.lower():
            kind = 'type'

        return DocItem(
            name=name,
            kind=kind,
            description='\n'.join(description),
            params=params,
            returns=returns,
            examples=examples,
            source_file=os.path.relpath(file_path, self.src_dir),
            category=category,
            group=group
        )

    def generate_markdown(self) -> None:
        """Generate markdown documentation from parsed items."""
        # Group docs by category
        docs_by_category: Dict[str, List[DocItem]] = {}
        for doc in self.docs:
            if doc.category not in docs_by_category:
                docs_by_category[doc.category] = []
            docs_by_category[doc.category].append(doc)

        # Generate main index
        index_content = ["# API Documentation\n\n"]
        
        # Add table of contents
        index_content.append("## Table of Contents\n\n")
        for category in sorted(docs_by_category.keys()):
            index_content.append(f"- [{category}](#{category.lower().replace(' ', '-')})\n")
        index_content.append("\n")

        # Generate detailed documentation
        for category in sorted(docs_by_category.keys()):
            index_content.append(f"## {category}\n\n")
            for item in sorted(docs_by_category[category], key=lambda x: x.name):
                index_content.extend(self._generate_item_doc(item))

        # Write to file
        os.makedirs(self.output_dir, exist_ok=True)
        with open(os.path.join(self.output_dir, 'API.md'), 'w', encoding='utf-8') as f:
            f.write(''.join(index_content))

    def _generate_item_doc(self, item: DocItem) -> List[str]:
        """Generate markdown documentation for a single item."""
        content = []
        content.append(f"### {item.name}\n\n")
        content.append(f"**Kind:** {item.kind}\n\n")
        content.append(f"**Group:** {item.group}\n\n")
        content.append(f"**Source:** `{item.source_file}`\n\n")
        
        if item.description:
            content.append(f"{item.description}\n\n")

        if item.params:
            content.append("#### Parameters\n\n")
            content.append("| Name | Type | Description |\n")
            content.append("|------|------|-------------|\n")
            for param in item.params:
                content.append(f"| {param['name']} | `{param['type']}` | {param['description']} |\n")
            content.append("\n")

        if item.returns:
            content.append("#### Returns\n\n")
            content.append(f"**Type:** `{item.returns['type']}`\n\n")
            content.append(f"{item.returns['description']}\n\n")

        if item.examples:
            content.append("#### Examples\n\n")
            for example in item.examples:
                content.append("```typescript\n")
                content.append(example)
                content.append("\n```\n\n")

        if item.definition:
            content.append("#### Definition\n\n")
            for prop, type_def in item.definition.items():
                content.append(f"- `{prop}`: `{type_def}`\n")
            content.append("\n")

        content.append("---\n\n")
        return content

def main():
    # Configure paths
    src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src'))
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'generated'))

    # Initialize generator
    generator = TSDocGenerator(src_dir, output_dir)

    # Process all TypeScript files
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.ts', '.tsx')) and not file.endswith('.d.ts'):
                file_path = os.path.join(root, file)
                try:
                    generator.parse_file(file_path)
                except Exception as e:
                    print(f"Error processing {file_path}: {str(e)}")

    # Generate documentation
    generator.generate_markdown()
    print("Documentation generated successfully in docs/generated/API.md")

if __name__ == '__main__':
    main()
