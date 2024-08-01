#!/usr/bin/awk -f

#Цей макрос заміняє всі входження @ENV:var на вміст змінної середовища.
{
    # Пошук шаблону @ENV:var у кожному рядку
    while (match($0, /@ENV:[a-zA-Z_][a-zA-Z0-9_]*/)) {
        # Витягнення імені змінної
        var_name = substr($0, RSTART+5, RLENGTH-5)

        # Отримання значення змінної середовища
        var_value = ENVIRON[var_name]

        # Заміна шаблону @ENV:var на значення змінної
        $0 = substr($0, 1, RSTART-1) var_value substr($0, RSTART+RLENGTH)
    }

    # Виведення зміненого рядка
    print
}
