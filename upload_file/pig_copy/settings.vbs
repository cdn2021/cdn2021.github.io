dim filepath
filepath = inputbox("请输入需要备份的文件夹的路径","猪猪备份")
set f = createObject("Scripting.FileSystemObject")
set fs = f.openTextFile("filepath.pigfile",2,True)
fs.Write filepath
fs.Close
msgbox "保存成功",0,"猪猪备份"