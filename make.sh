#ENV.awk will use this/these vars to replace @ENV: occurencies in target file
export USER_SCRIPT=$(cat $1)

cd "$(dirname "$0")" || exit 1  # goto make.sh folder

mkdir -p build
awk/ENV.awk lw_dash.html > build/lw_dash.html
