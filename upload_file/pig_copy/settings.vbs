dim filepath
filepath = inputbox("��������Ҫ���ݵ��ļ��е�·��","������")
set f = createObject("Scripting.FileSystemObject")
set fs = f.openTextFile("c:\pig_copy\filepath.pigfile",2,True)
fs.Write filepath
fs.Close
msgbox "����ɹ�",0,"������"