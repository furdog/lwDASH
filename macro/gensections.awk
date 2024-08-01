#!/usr/bin/awk -f

# Цей скрипт виділяє вміст кожної секції в окремі файли, доповнюючи їх, якщо секції повторюються

# Регулярний вираз для знаходження початку секції
/^@SECTION:/ {
    # Витягуємо ім'я секції
    section_name = substr($0, 10)
    next
}

# Якщо поточний рядок не є початком нової секції
{
    # Якщо є активна секція, додаємо рядок у відповідний файл
    if (section_name) {
        print $0 >> "generated/" section_name
    }
}
