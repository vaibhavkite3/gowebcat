GoWebCat

Web based file/log viewer with API

Usage :

/getfolderlistextn : to get allowed folder lists and allowed extensions
/getfilelist : to get file list from requested folder and extension
    POST Body - 
                folderpath (String)
                extn (String)

/getfiledata : to get file data
    POST Body - 
                filename (String)
                numberoflines (String)
                viewtype (String) [head/tail]