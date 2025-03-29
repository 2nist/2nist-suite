#!/bin/bash

# Navigate to the project root
echo "Navigating to project root..."
cd "$(dirname "$0")"

# Install dependencies for the main project
echo "Installing dependencies for the main project..."
npm install

# Install dependencies for apps/10sion
echo "Installing dependencies for apps/10sion..."
cd apps/10sion
npm install
cd ../..

# Install dependencies for apps/2nist
echo "Installing dependencies for apps/2nist..."
cd apps/2nist
npm install
cd ../..

# Install dependencies for packages/ui-hooks
echo "Installing dependencies for packages/ui-hooks..."
cd packages/ui-hooks
npm install
cd ../..

# Verify setup
echo "Verifying setup..."
code --folder-uri "$(pwd)" --command "workbench.action.tasks.runTask" --args "verify"

echo "Setup complete!"