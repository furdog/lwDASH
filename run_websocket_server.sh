export WS_SERVER_ADDRESS="ws://localhost:8765"
bash make.sh

echo "Ready to accept clients..."
python websocket_server.py
read -p "Press any key to continue "
