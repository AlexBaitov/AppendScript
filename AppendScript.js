/**
 * Прикпрепляет скрипт в head<br>
 * Проверят на наличие по src и второй раз не прикрепляет
 * @param options {object} В callback-функции первым параметром возвращает:<br>
 *  2 - если скрипт уже есть на странице,<br>
 *  1 - если присоединил,<br>
 *  0 - если скрипта всё ещё нет на странице<br>
 *  Вторым параметром в success находится DOM элемент прикрепленного скрипта
 */
function AppendScript(options){
	var options = jQuery.extend({
		src : '',
		success: function(){},
		error: function(){}
	},options);

	var DEF_script = $.Deferred();
	DEF_script.done(function(fileExistence){         // файл подгружен (1) или уже был подгружен (2)
		var script = document.createElement("script");
		switch (fileExistence) {
			case '2':
				options.success(fileExistence,script);
				break;
			case '1':
				var head = document.head || document.getElementsByTagName('head')[0];
				script.type="text/javascript";
				script.src = options.src;
				$(script).on('load',function(){
					options.success(fileExistence,script);
				});
				head.appendChild(script);
		}
	}).fail(function(){                     // файл не подгрузился (0)
			options.error(0);
		});

	if (!options.src) {
		DEF_script.reject();
		return 0;
	}

	if (document.querySelectorAll('script[src^="'+options.src+'"]').length) {
		DEF_script.resolve('2');
		return 2;
	}

	proceedWithFileExistence = function(jqXHR){
		if ($.inArray(jqXHR.status-0,[404])>=0) {
			DEF_script.reject();
		} else {
			DEF_script.resolve('1');
		}
	};

	$.ajax({
		url:options.src,
		dataType:'script',
		success:function(data,textStatus,jqXHR){
			proceedWithFileExistence(jqXHR);
		},
		error:function(jqXHR,textStatus,errorThrown ){
			proceedWithFileExistence(jqXHR);
		}
	});
}