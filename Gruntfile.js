'use strict';

module.exports = function(grunt) {

 var chalk = require('chalk');
 var _ = require('lodash');
 
 var VARIABLES = require('./GruntVariables.js');
 
   
 grunt.loadNpmTasks('grunt-figlet');
 grunt.loadNpmTasks('grunt-cat');
 
 grunt.loadNpmTasks('grunt-attention');
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-notify');

 
 grunt.loadNpmTasks('grunt-prompt');
 
  require('time-grunt')(grunt);
 
 
    grunt.initConfig({
	

	
// https://github.com/patorjk/grunt-figlet
        figlet: {
            options: {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            },

            defaultOptions: 'Test',
            defaultOptions2: 'FIGlet\nFONTS',

            customComment: {
                options: {
                    text: 'DONE',
                    font: 'Graffiti',
                    comment: {
                        style: 'js',
                        generate: function(asciiArtText) {
                            return asciiArtText + '\nThis is a test message.\nMore random text\nAnd some more...';
                        }
                    }
                }
            },

            standard: {
                options: {
                    text: 'Build started',
                    font: 'Standard',
                    horizontalLayout: 'default',
                    verticalLayout: 'fitted'
                }
            },

            graffiti: {
                options: {
                    text: 'E2E Tests started',
                    font: 'Graffiti',
                    horizontalLayout: 'fitted'
                }
            },

            dancingFont: {
                options: {
                    text: 'DONE',
                    font: 'Dancing Font',
                    horizontalLayout: 'full'
                }
            },
        },
		
		uglify:{
			options: {
					banner: '/*\n<%= figlet.dancingFont %>\n*/\n'
				},
				sample: {
					src: 'sample.js',
					dest: 'sample.min.js'
				}
		},
		
		
		 cat: {
			logo: {
			  file: 'fixtures/lorem.txt'
			},
			prod: {
			  file: 'fixtures/doodleordie.ansi'
			},
			prod2: {
			  file: 'fixtures/bw_piranha_3menu.ans'
			},
			multi: {
			  src: ['files/**/*.js']
			},
			multi_stream: {
			  options: {linebreak:false},
			  src: ['files/**/*.txt']
			}
	},
	  attention: {
			connect: {
			  options: {
				message: 'Server started: ' +
				chalk.underline.blue('http://localhost:8080/'),
				borderColor: 'bgBlue'
			}},
			test2: {
			  options: {
				message: chalk.green.bold('Files have been pushed to .') +
					'\n\n' +
					chalk.green(' files uploaded successfully in seconds.'),
				border: 'double',
				borderColor: 'bgGreen'      }
			}

		  
		  },
		  
		   notify: {
			  custom_options: {
				options: {
				  title: 'Notify Title',
				  message: 'This is a "Notify Message" test!'
				}
			  }
			},
			
			 prompt: {
				question1: {
				  options: {
					questions: [
					  {
						config: 'prompt.answer', // arbitray name or config for any other grunt task
						type: 'checkbox', // list, checkbox, confirm, input, password
						message: 'Some checkbox', // Question to ask the user, function needs to return a string,
						default: 'value', // default value if nothing is entered
						choices: ['one', 'two'], 
						validate: function(value){
							return true;
						}, // return true if valid, error message if invalid
						filter:  function(value){
							return "_"+value;
						}, // modify the answer
						when: function(answers){
							return true;// only ask this question when this function returns true
					  }
					  }
					],
				
				}
			},
			question2 : {
			  options: {
					questions: [
					  
					    {
						config: 'prompt.answer2', // arbitray name or config for any other grunt task
						type: 'list', // list, checkbox, confirm, input, password
						message: 'Some list',
						choices: ['one', 'two']
						}]
					  
			}
			},
			question3 : {
			  options: {
					questions: [
					  
					    {
						config: 'prompt.answer3', // arbitray name or config for any other grunt task
						type: 'confirm', // list, checkbox, confirm, input, password
						message: 'Are you sure?'
						}]
					  
			}
			},
			question4 : {
			  options: {
					questions: [
					  
					    {
						config: 'prompt.answer4', // arbitray name or config for any other grunt task
						type: 'input', // list, checkbox, confirm, input, password
						message: 'Username?'
						}]
					  
			}
			},
			question5 : {
			  options: {
					questions: [
					  
					    {
						config: 'prompt.answer5', // arbitray name or config for any other grunt task
						type: 'password', // list, checkbox, confirm, input, password
						message: 'Password?'
						}]
					  
			}
			},
			
			
			allTasks : {
        options : {
            questions : [
                {
                config : 'prompt.run.task'
                ,
                type: 'checkbox',//'list',
                message: 'Which task to run?',
                choices : function(){
                    return grunt.config.get('taskNames').taskNames;
                }
                }
            ]
        }
    },		
	}

	});
	

		grunt.task.registerTask("logPrompt", 'some logging', function(){
			 
			 var prompt= grunt.config.get('prompt');
			 
			 _.forEach(prompt,function(text){
					grunt.log.writeln(text);
				});
			 
//			 var prompt = grunt.config.get('prompt.answer');
	//		 grunt.log.writeln(prompt);
			 
		//	 var prompt2 = grunt.config.get('prompt.answer2');
			// grunt.log.writeln(prompt2);
		});
		
	
		grunt.task.registerTask("logVar", 'some logging', function(){
			grunt.log.writeln(VARIABLES.openPath);
		});
	
		
		 grunt.task.registerTask("log", 'some logging', function(){
			 
			 var figlets = grunt.config.get('figlet');
			 
				_.forEach(figlets,function(text){
					grunt.log.writeln(text);
				});
				// grunt.log.writeln(grunt.config.get('figlet.dancingFont'));
				//grunt.log.writeln(grunt.config.get('figlet.standard'));
			
		 });
		 
		 grunt.registerTask('allGruntTasks', function (target) {
				var taskNames = [];
			  _(grunt.task._tasks).forEach(function(task){
				  if(task.info.indexOf("Alias") === 0){ // === 'Custom task.'
					  taskNames.push(task.name);
				  }
			  });
			grunt.config(['taskNames'], {'taskNames': taskNames});
    });
	
	
	grunt.registerTask('runTask', function (target) {
        grunt.task.run( grunt.config.get('prompt.run.task'));
    });
		
	
	
	grunt.registerTask('default', ['allGruntTasks', 'prompt:allTasks', 'runTask']);
	
	grunt.registerTask('dev', ['prompt:question1']);
	grunt.registerTask('prod', ['prompt:question2']);
	
};
