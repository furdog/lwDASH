#!/bin/bash
sed -e "s/@GIT_VERSION/$(git describe --tags)/" \
interface.html > interface.built.html

#Цей скрипт містить макроси які використовуються для попередньої обробки текстових файлів.

#Директива @include=file.extension заміняє себе на вміст файлу file.extension 
awk -i inplace '
{
    while (match($0, /@INCLUDE:[^ \t\n]+/)) {
        include_directive = substr($0, RSTART, RLENGTH)
        filename = substr(include_directive, 10)  # видаляємо "@INCLUDE:"
        
        # Зчитуємо вміст файлу
        system("cat " filename)
        
        # Заміна директиви на порожній рядок
        $0 = substr($0, 1, RSTART-1) substr($0, RSTART+RLENGTH)
    }
    print
}' interface.built.html

./core/env.awk -i inplace interface.built.html
