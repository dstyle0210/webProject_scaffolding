module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
	        dev: {
	            base: 'bower_components', /* the path to the bower_components directory */
	            dest: './src/lib',
	            options: {
	                checkExistence: true,
	                debugging: true,
	                paths: {
	                    bowerDirectory: 'bower_components',
	                    bowerrc: '.bowerrc',
	                    bowerJson: 'bower.json'
	                }
	            }
	        }
	    },
	    "bower-install-simple": {
	        options: {
	            color: true
	        },
	        "prod": {
	            options: {
	                production: true
	            }
	        },
	        "dev": {
	            options: {
	                production: false
	            }
	        }
	    },
// LESS Precompaper.
less:{
	dev:{
		files:[{expand: true,cwd: 'src/asset/less',src: ['*.less'],dest: 'src/asset/css/',ext: '.css'}]
	}
},
// Autoprefixer
autoprefixer : {
	options : {
		browsers: ['last 5 version','ie 8','ie 9','ie 10']
	},
	dev: {
		src: 'src/asset/css/*.css'
	}
},
// CSS Min
cssmin: {
	combine: {
	    files: {'dist/asset/css/style.css': ['dist/asset/css/*.css']}
	  },
	dist: { // 배포할때만 압축한다.
		expand: true,
		src: ['dist/asset/css/style.css'],
		ext: '.min.css'
	}
},
// text Replace by CSS
replace: {
	dist:{
		src: ['dist/asset/css/*.css'],
		overwrite: true, 
		replacements: [
			{ from: /}/g, to: "}\n" },
			{from:"UTF-8\";",to:"UTF-8\";\n"},
			{from:"*/",to:"*/\n"},
			{from:"/*!",to:"\n/*!"}
		]
	}
},
// Clean
clean: {
	dev: ["src/asset/css"], // 개발하는중에 CSS삭제.
	dist: ["dist/asset/css"], // 배포하는중에 CSS삭제.
	pick:["dist/asset/css/*.css","!dist/asset/css/*.min.css"] // 배포후 컴바인 후에 min을 제외한 CSS삭제.
},
// Watch
watch: {
	less:{
		files: ['src/asset/**/*.less'], // LESS파일이 수정되면 실행
		tasks: ['less:dev','autoprefixer:dev'] 
	}
},
// COPY
copy: {
	dist: {
		files: [{expand: true,cwd: 'src/asset/css',src: ['*.css'],dest: 'dist/asset/css'}]
	}
},


		 casperjs: {
			 options: {},
		    files: 'src/casper.js' 
		  },
		  fileindex: {
		        custom: {
		            options: {
		                format: function(list, options, dest) {
		                	var str = "<div>";
		                	var arr = list;
		                	for(i=0;i<arr.length;i++){
		                		str+="<a href='"+((arr[i]).split("src/")[1])+"'>"+((arr[i]).split("src/")[1])+"</a><br />";
		                	}
		                	str += "</div>";
		                	return str;
		                }
		            },
		            files: [
		                {dest: 'src/casper.html', src: ['**/*.jsp']}
		            ]
		        }
		    }
	}); 


	/*
	 * 작업에 필요한 모듈 로드하기 grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}
	grunt.loadNpmTasks('main-bower-files');
	
	
	// Default task(s).
	grunt.registerTask('setting', ["bower-install-simple:prod","bower:dev"]);
	grunt.registerTask('dist', ["clean:dist","copy:dist","cssmin","clean:pick","replace:dist","fileindex","casperjs"]);
	grunt.registerTask('default', ["clean:dev","less:dev","autoprefixer:dev","watch"]);
};