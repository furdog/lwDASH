#!/usr/bin/awk -f

{
	# Перевірка на входження @MODULE:path
	if (match($0, /@MODULE:([a-zA-Z0-9_\/]+)/, arr)) {
		# Отримуємо шлях з входження
		path = arr[1]

		# Виводимо службову інформацію в stdout
		system("echo Спроба підключити модуль: " path " >&2")

		# Виклик bash скрипта з параметром path
		system("bash mksub.sh web/modules/" path "/module.js")

		#Переходимо на інший рядок
		next
	}
	
	#Ми нічого не записуємо у файл, лише викликаємо скрипт.
}
