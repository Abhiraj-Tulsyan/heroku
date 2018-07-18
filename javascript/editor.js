var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

document.getElementById('fontsize').addEventListener('change' , function()
{

document.getElementById('editor').style.fontSize=document.getElementById('fontsize').value;
})
document.getElementById('editortheme').addEventListener('change' , function()
{
var x=document.getElementById('editortheme').value;
editor.setTheme('ace/theme/'+x);
});
document.getElementById('langvalue').addEventListener('change' , function()
{
   
    var x=document.getElementById('langvalue').value;
    compiler.checking(x).then(function(data)
{
    editor.session.setValue(data);
});
   
   
    
 
if(x==='9'||x=='12')
{
editor.session.setMode("ace/mode/c_cpp");
} 
else if(x=='40')
{
editor.session.setMode("ace/mode/java");
}
else
{

editor.session.setMode("ace/mode/python");
}
});

editor.session.setMode("ace/mode/text");
editor.setOption("autoScrollEditorIntoView" , true) 
document.getElementById('scriptsend').addEventListener('click' , function()
{
compiler.scriptLanguage= document.getElementById('langvalue').value;
compiler.scriptValue= editor.getValue();
compiler.sending();
})
                     