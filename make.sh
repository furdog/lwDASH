#!/bin/bash

# Перевірка, чи переданий файл як аргумент
if [ -z "$1" ]; then
	echo "Будь ласка, вкажіть вхідний файл для побудови веб інтерфейсу."
	exit 1
fi

# Перевірка існування файлу
if [ ! -f "$1" ]; then
	echo "Файл $1 не існує."
	exit 1
fi

#Встановлюємо необхідні змінні середовища
export GIT_REPO_VERSION=$(git describe --tags)

if [ -z "${WEBSOCKET_SERVER_ADDRESS+x}" ]; then
        export WEBSOCKET_SERVER_ADDRESS='"ws://DetecBOX.local:8765"'
fi

#Створюємо директорію, куди будемо класти всі необхідні файли збірки
mkdir -p build

#Копіюємо індекс у директорію для збірки
cat web/core/index.html > build/index.html

#Згенеруємо файли секцій для користувацького інтерфейсу
rm -rf web/generated 2> /dev/null
mkdir -p web/generated
macro/gensections.awk "$1"

#Переходимо у директорію з якої ми будемо виконувати макроси
cd web

#Виконуємо всі необхідні макропідстановки у скопійований індекс
../macro/includefile.awk -i inplace ../build/index.html
../macro/environment.awk -i inplace ../build/index.html

echo "Побудову веб інтерфейсу зарершено."
