#!/bin/bash

#Викликаючи цей скрипт з шляхом до файлу, ми імпортуємо його секції.

#Рекурсивно вставляємо інші модулі, якщо в цьому є потреба
macro/setupmodule.awk "$1"

#Виконуємо необхідні макропідстановки у файл модуля.
macro/includefile.awk "$1" > build/temp.tmp

#Згенеруємо файли секцій для файлу модуля.
macro/gensections.awk -v sections_dir=build/sections build/temp.tmp
