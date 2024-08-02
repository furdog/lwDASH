#!/bin/bash

#Встановлюємо необхідні змінні середовища
export GIT_REPO_VERSION=$(git describe --tags)

if [ -z "${WEBSOCKET_SERVER_ADDRESS+x}" ]; then
        export WEBSOCKET_SERVER_ADDRESS='"ws://localhost:8765"'
fi

#Створюємо директорію, куди будемо класти всі необхідні файли збірки
mkdir -p build

#Копіюємо індекс у директорію для збірки
cat web/core/index.html > build/index.html

#Переходимо у директорію з якої ми будемо виконувати макроси
cd web

#Згенеруємо файли секцій для користувацького інтерфейсу
rm -rf generated 2> /dev/null
mkdir -p generated
../macro/gensections.awk user/user.js

#Виконуємо всі необхідні макропідстановки у скопійований індекс
../macro/includefile.awk -i inplace ../build/index.html
../macro/environment.awk -i inplace ../build/index.html
