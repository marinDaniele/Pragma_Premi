#!bin/bash
flag=1
echo "Select the JSdoc compiling mode :\n1)default\n2)notConstructor "
read -e mode
if  [[ "$mode" = "default" || "$mode" = "1" ]]; then
	sed -i -- 's/notConstrMeth.tmpl/method.tmpl/g' $PWD/node_modules/jsdoc/templates/default/tmpl/container.tmpl;
elif [[ "$mode" = "notConstructor" || "$mode" = "2" ]]; then
	sed -i -- 's/method.tmpl/notConstrMeth.tmpl/g' $PWD/node_modules/jsdoc/templates/default/tmpl/container.tmpl;
else
	flag=0
    nipples=`cat ./docs/asciiart.txt`
    echo "$nipples"
	echo "Invalid compiling mode!\n....taste the nipples....\n"
fi
if [[ ${flag} -eq 1  ]]; then
	echo "Would you like to compile all Back-End classes?\n Y : N\n"
	read -e answer
	if [[ "$answer" = "Y" || "$answer" = "y" ]]; then
		node node_modules/jsdoc/jsdoc.js ./app/controllers/ ./app/controllers/users/ ./app/controllers/projects/ ./app/controllers/errors/ ./app/models/ ./app/routers/*.js
	else
		if [[ "$answer" = "N" || "$answer" = "n" ]]; then
			echo "Would you like to compile all Front-End classes?\n Y : N\n"
			read -e answer
			if [[ "$answer" = "Y" || "$answer" = "y" ]]; then
				node node_modules/jsdoc/jsdoc.js ./public/modules/premi/app/ ./public/modules/premi/app/services ./public/modules/premi/app/model ./public/modules/premi/app/controllers ./public/modules/premi/app/directives/ ./public/modules/premi/app/directives/addToPath ./public/modules/premi/app/directives/associationAdder ./public/modules/premi/app/directives/contextMenu ./public/modules/premi/app/directives/editableNodeContent ./public/modules/premi/app/directives/errorMessage ./public/modules/premi/app/directives/footer ./public/modules/premi/app/directives/header ./public/modules/premi/app/directives/hierarchicalMenu ./public/modules/premi/app/directives/mindmap ./public/modules/premi/app/directives/node ./public/modules/premi/app/directives/nodeContent ./public/modules/premi/app/directives/nodeContentsEditor ./public/modules/premi/app/directives/path ./public/modules/premi/app/directives/pathsList ./public/modules/premi/app/directives/presentation ./public/modules/premi/app/directives/projectSettingsEditor ./public/modules/premi/app/directives/projectsList ./public/modules/premi/app/directives/smartMenu/*.js
			else
				echo "insert ONLY the path containing the files to be documented :\n"
				read -e path
				node node_modules/jsdoc/jsdoc.js $path/*.js
			fi
		fi
	fi
	echo "Documentation compiled!\n"
else
	echo "Failed to compile documentation!\n"
fi