var socket = io.connect();
var content = $("#content");

$(function(){
	$('#broadcast').click(function(){
		if(content.val() === ''){
			$('#error').html('Please Enter some Text.');
			document.getElementById('error').hidden = false;
		}
		else{
			$('#error').html('');
			document.getElementById('error').hidden = true;
			socket.emit('content', content.val())
		}
	});
});


socket.on('show connections', function(data){
	$('#total').html('<b>Total Active Connections are:</b> &nbsp;&nbsp;<strong style="color: white;">'+ data.connections + '</strong>')
});	

socket.on('copied text', function(data){
	var txt = data.ctext;
	$('#copiedtext').text(txt);
	document.getElementById('shower').hidden = false;
});	
