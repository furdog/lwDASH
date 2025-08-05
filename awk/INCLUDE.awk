#!/usr/bin/awk -f

# This macro replaces all occurrences of @INCLUDE:file 
# with the content of the file.
{
	while (match($0, /@INCLUDE:[^ \t\n]+/)) {
		include_directive = substr($0, RSTART, RLENGTH)
		filename = substr(include_directive, 10)  # remove "@INCLUDE:"
		
		system("echo Attempting to include file: " filename " >&2")
		
		# Read the content of the file
		system("cat " filename)
		
		# Replace the directive with an empty string
		$0 = substr($0, 1, RSTART-1) substr($0, RSTART+RLENGTH)
	}

	print
}
