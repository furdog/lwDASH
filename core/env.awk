#!/usr/bin/awk -f

# Читаємо змінну середовища SERVER_ADDRESS
BEGIN {
    # Встановлюємо значення за замовчуванням, якщо змінна не задана
    server_address = "\""ENVIRON["WS_SERVER_ADDRESS"]"\""
    if (server_address == "\"\"") {
        server_address = "\"ws://DetecBOX.local:8765\""
    }
}

{
    # Замінюємо макрос @SERVER_ADDRESS на значення змінної
    gsub(/@ENV_WS_SERVER_ADDRESS/, server_address)
    print
}
