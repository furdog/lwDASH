export USER_SCRIPT=$(cat $1)

cd "$(dirname "$0")" || exit 1  # goto make.sh folder

mkdir -p build

awk/ENV.awk lw_dash.html > build/lw_dash.html
export LW_DASH_BASE64=$'\n'$(base64 -w 79 build/lw_dash.html)

awk/ENV.awk lw_dash.dyn.html > build/lw_dash.dyn.html
