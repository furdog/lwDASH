import asyncio
import websockets
import json
import random

connected_clients = set()

async def send_initial_messages(client):
	#freq
	message = ["freq", [random.randint(370, 1010) for n in range(6)]]
	message_json = json.dumps(message)
	await client.send(message_json)

	#calib
	message = ["calib", [random.randint(0, 100) for n in range(6)]]
	message_json = json.dumps(message)
	await client.send(message_json)

	#sens
	message = ["sens", [random.randint(8, 12) for n in range(6)]]
	message_json = json.dumps(message)
	await client.send(message_json)

	#forall
	#message = ["forall", [random.randint(8, 12) for n in range(6)]]
	#message_json = json.dumps(message)
	#await client.send(message_json)

	print("Sent initial message to connected client")

async def handler(websocket, path):
	# Register client
	connected_clients.add(websocket)
	print("Client connected")
	
	await send_initial_messages(websocket);
	
	try:
		async for message in websocket:
			print("Received message:", message)
			for client in connected_clients:
				if client != websocket:
					await client.send(message)
	except websockets.ConnectionClosed:
		print("Client disconnected")
	finally:
		# Unregister client
		connected_clients.remove(websocket)

async def periodic_message():
	while True:
		await asyncio.sleep(1)  # Adjust the interval as needed
		message = ["log", [random.randint(-5, 5) for n in range(6)]]
		message_json = json.dumps(message)
		for client in connected_clients:
			await client.send(message_json)
		print("Sent periodic message to all clients")

async def main():
	async with websockets.serve(handler, "localhost", 8765):
		# Run the periodic message task alongside the websocket server
		await asyncio.gather(
			asyncio.Future(),  # Run forever
			periodic_message()
		)

if __name__ == "__main__":
	asyncio.run(main())
