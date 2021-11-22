cd ..
cd src/
echo "Installing dependencies"
pip3 install -r requirements.txt
echo ""
echo "Starting server..."
python3 server.py