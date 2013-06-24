AppendScript
============
## Description (EN)
* Appends script in a \<head\><br>
* Checks the presence of the script by src and do not append twice<br>
* Execute callback-function on success or error

**Input object properties:**
```
src : '',                                       // script src
success: function(fileExistence, script){},     // callback on success
error: function(fileExistence){}                // callback on error
```
The success-callback function receives two parameters:
<table>
    <tr>
        <td>fileExistence</td>
        <td>{integer}</td>
        <td>
            2 - if the script was already in DOM<br>
            1 - if the script has just appended
        </td>
    </tr>
    <tr>
        <td>script</td>
        <td>{DOM element}</td>
        <td>appended or already presented script</td>
    </tr>
</table>

The error-callback function receives one parameter:
<table>
    <tr>
        <td>fileExistence</td>
        <td>{integer}</td>
        <td>
            0 - if the script is still absent in DOM
        </td>
    </tr>
</table>

**Requires:** jQuery 1.7+<br>
**N.B.** This function could be written without jQuery, but it would not be as short as it is.

## Описание (RU)
Прикпрепляет скрипт в \<head\><br>
Проверят на наличие по src и второй раз не прикрепляет<br>
@param options {object} В callback-функции первым параметром возвращает:<br>
    2 - если скрипт уже есть на странице,<br>
    1 - если присоединил,<br>
    0 - если скрипта всё ещё нет на странице<br>
Вторым параметром в success находится DOM элемент прикрепленного скрипта

## Usage
```
AppendScript({
    src:'/js/some.js',
	success: function(fileExistence,script){
	    SomeFunctionInSomeJS();
	}
});
```

## Authors
* Alex Baitov
[LinkedIn](http://ru.linkedin.com/pub/alex-baitov/10/b88/583)
