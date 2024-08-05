export WEBSOCKET_SERVER_ADDRESS='"ws://localhost:8765"'
bash make.sh "$1"

echo "Ready to accept clients..."
python python/websocket_server.py

read -p "Press any key to continue "
