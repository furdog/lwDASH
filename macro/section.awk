#!/usr/bin/awk -f

# Перевірка наявності параметра секції
BEGIN {
    if (ARGC < 2) {
        print "Usage: awk -f script.awk section_name file"
        exit 1
    }
    section = ARGV[1]
    ARGV[1] = "" # Залишаємо тільки ім'я файлу в ARGV
    in_section = 0
}

# Виявлення секції та її вмісту
/^@SECTION:/ {
    in_section = ($2 == section)
    next
}

# Якщо в секції, виводимо рядки
in_section {
    print $0
}
