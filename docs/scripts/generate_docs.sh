#!/bin/bash

# Create and activate virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run documentation generator
python doc_generator.py

# Deactivate virtual environment
deactivate
