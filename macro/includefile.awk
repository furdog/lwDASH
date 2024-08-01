#!/usr/bin/awk -f

#Цей макрос заміняє всі входження @INCLUDE:file на вміст файлу.
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
}
