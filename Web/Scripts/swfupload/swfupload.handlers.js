/* ******************************************
*	初始化SWFUpload上传控件
* ****************************************** */
function InitSWFUpload(upurl, uppath, upsize, flashurl, showlistid) {
    var sendUrl = upurl;

    var swfu = new SWFUpload({
        // Backend Settings
        upload_url: sendUrl,
        file_post_name: uppath,
        post_params: { "ASPSESSID": "NONE" },

        file_size_limit: upsize,
        file_types: "*.jpg;*.jpge;*.png;*.gif",
        file_types_description: "JPG Images",
        file_upload_limit: "0",
        file_queue_error_handler: fileQueueError,
        file_dialog_complete_handler: fileDialogComplete,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccess,
        upload_complete_handler: uploadComplete,

        // Button Settings
        button_placeholder_id: "upload",
        button_width: 100,
        button_height: 100,
        button_text: '',
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        button_cursor: SWFUpload.CURSOR.HAND,

        // Flash Settings
        flash_url: flashurl,

        custom_settings: {
            upload_target: "show",
            show_list_id: showlistid
        },
        // Debug Settings
        debug: false
    });
}

function InitSWFUploadWithUseSelect(upurl, uppath, upsize, flashurl, showlistid) {
    var sendUrl = upurl;

    var swfu = new SWFUpload({
        // Backend Settings
        upload_url: sendUrl,
        file_post_name: uppath,
        post_params: { "ASPSESSID": "NONE" },

        file_size_limit: upsize,
        file_types: "*.jpg;*.jpge;*.png;*.gif",
        file_types_description: "JPG Images",
        file_upload_limit: "0",
        file_queue_error_handler: fileQueueError,
        file_dialog_complete_handler: fileDialogComplete,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccessWithUseSelect,
        upload_complete_handler: uploadComplete,

        // Button Settings
        button_placeholder_id: "upload",
        button_width: 100,
        button_height: 100,
        button_text: '',
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        button_cursor: SWFUpload.CURSOR.HAND,

        // Flash Settings
        flash_url: flashurl,

        custom_settings: {
            upload_target: "show",
            show_list_id: showlistid
        },
        // Debug Settings
        debug: false
    });
    

}

    function InitSWFUploadSingle(upurl, uppath, upsize, flashurl, showlistid) {
        var sendUrl = upurl;
        var btnAction = SWFUpload.BUTTON_ACTION.SELECT_FILE;

        var swfu = new SWFUpload({
            // Backend Settings
            upload_url: sendUrl,
            file_post_name: uppath,
            post_params: { "ASPSESSID": "NONE" },

            file_size_limit: upsize,
            file_types: "*.jpg;*.jpge;*.png;*.gif",
            file_types_description: "JPG Images",
            file_upload_limit: "0",
            file_queue_error_handler: fileQueueError,
            file_dialog_complete_handler: fileDialogComplete,
            upload_progress_handler: uploadProgress,
            upload_error_handler: uploadError,
            upload_success_handler: uploadSuccessSingle,
            upload_complete_handler: uploadComplete,

            // Button Settings
            button_placeholder_id: "upload",
            button_width: 100,
            button_height: 100,
            button_text: '',
            button_action: btnAction,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            // Flash Settings
            flash_url: flashurl,

            custom_settings: {
                upload_target: "show",
                show_list_id: showlistid
            },
            // Debug Settings
            debug: false
        });
    }

/* ******************************************
*	返回上传的状态
* ****************************************** */
    function uploadSuccess(file, serverData) {
    try {
        var progress = new FileProgress(file, this.customSettings.upload_target);
        var jsonstr = eval('(' + serverData + ')');
        if (jsonstr.msg == '0') {
            alert(jsonstr.msgbox);
            //progress.setStatus(jsonstr.msgbox);
            //progress.toggleCancel(false);
        }
        if (jsonstr.msg == '1') {
            var imgArr = jsonstr.msgbox.split(",");
            if (imgArr.length == 2) {
                addImage(imgArr[0], imgArr[1], this.customSettings.show_list_id);
            } else {
                addImage(jsonstr.msgbox, jsonstr.msgbox, this.customSettings.show_list_id);
            }
            //progress.setStatus("缩略图创建成功.");
            //progress.toggleCancel(false);
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccessWithUseSelect(file, serverData) {
    try {
        var progress = new FileProgress(file, this.customSettings.upload_target);

        var jsonstr = eval('(' + serverData + ')');
        if (jsonstr.msg == '0') {
            alert(jsonstr.msgbox);
            //progress.setStatus(jsonstr.msgbox);
            //progress.toggleCancel(false);
        }
        if (jsonstr.msg == '1') {
            var imgArr = jsonstr.msgbox.split(",");
            if (imgArr.length == 2) {
                addImageWithUseSelect(imgArr[0], imgArr[1], this.customSettings.show_list_id);
            } else {
                addImageWithUseSelect(jsonstr.msgbox, jsonstr.msgbox, this.customSettings.show_list_id);
            }
            //progress.setStatus("缩略图创建成功.");
            //progress.toggleCancel(false);
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccessSingle(file, serverData) {
    try {

        var progress = new FileProgress(file, this.customSettings.upload_target);
        var jsonstr = eval('(' + serverData + ')');
        if (jsonstr.msg == '0') {
            //progress.setStatus(jsonstr.msgbox);
            //progress.toggleCancel(false);
        }
        if (jsonstr.msg == '1') {
            var imgArr = jsonstr.msgbox.split(",");
            if (imgArr.length == 2) {
                addImageSingle(imgArr[0], imgArr[1], this.customSettings.show_list_id);
            } else {
                addImageSingle(jsonstr.msgbox, jsonstr.msgbox, this.customSettings.show_list_id);
            }
            //progress.setStatus("缩略图创建成功.");
            //progress.toggleCancel(false);
        }
    } catch (ex) {
        this.debug(ex);
    }
}
/* ******************************************
*	添加图片列表
* ****************************************** */
function addImage(bigSrc, smallSrc, showlistid) {
    var newLi = $('<li></li>');
    var claname = '';
    var newImgDiv = $('<div class=\"img_box ' + claname + '">' + '</div>').appendTo(newLi);
    var newImg = $('<a href="' + smallSrc + '" class="viewImg"><img src="' + smallSrc + '" /></a>').appendTo(newImgDiv);
    var delIme = $('<a href="javascript:;" onclick="del_img(this);" class="deletea"><img src="../../../../Content/Images/ToolBarButton/no.png"/></a>').appendTo(newImgDiv);

    newLi.appendTo("#" + showlistid + " ul");

    newImgDiv.bind('mouseover', function () {
        $(this).children('a.deletea').show();
    });
    newImgDiv.bind('mouseout', function () {
        $(this).children('a.deletea').hide();
    });
}

function addImageSingle(bigSrc, smallSrc, showlistid) {
    var newLi = $('<li></li>');
    var claname = '';
    var newImgDiv = $('<div class=\"img_box ' + claname + '">' + '</div>').appendTo(newLi);
    var newImg = $('<a href="' + smallSrc + '" class="viewImg"><img src="' + smallSrc + '" /></a>').appendTo(newImgDiv);
    var delIme = $('<a href="javascript:;" onclick="del_imgSingle(this);" class="deletea"><img src="../../../../Content/Images/ToolBarButton/no.png"/></a>').appendTo(newImgDiv);

    newLi.appendTo("#" + showlistid + " ul");

    newImgDiv.bind('mouseover', function () {
        $(this).children('a.deletea').show();
    });
    newImgDiv.bind('mouseout', function () {
        $(this).children('a.deletea').hide();
    });
    newLi.parent().parent().next('.upload_btn').hide(); //隐藏上传框
}

function addImageWithUseSelect(bigSrc, smallSrc, showlistid) {
    var newLi = $('<li></li>');
    var claname = '';
    var newImgDiv = $('<div class=\"img_box ' + claname + '">' + '</div>').appendTo(newLi);
    AddBrandUseSelect(newImgDiv);
    var newImg = $('<a href="' + smallSrc + '" class="viewImg"><img src="' + smallSrc + '" /></a>').appendTo(newImgDiv);
    var delIme = $('<a href="javascript:;" onclick="del_img(this);" class="deletea"><img src="../../../../Content/Images/ToolBarButton/no.png"/></a>').appendTo(newImgDiv);
    newLi.appendTo("#" + showlistid + " ul");

    newImgDiv.bind('mouseover', function () {
        $(this).children('a.deletea').show();
    });
    newImgDiv.bind('mouseout', function () {
        $(this).children('a.deletea').hide();
    });
}
/* ******************************************
*	删除LI元素
* ****************************************** */
function del_img(obj) {
    var smallimg = $(obj).prev('a.viewImg').attr("href");
    delUpFile(smallimg); //调ajax方法删除已上传的图片
    var node = $(obj).parent().parent(); //要删除的LI节点
    node.remove(); //删除DOM元素
}

function del_imgSingle(obj) {
    var smallimg = $(obj).prev('a.viewImg').attr("href");
    delUpFile(smallimg); //调ajax方法删除已上传的图片
    var node = $(obj).parent().parent(); //要删除的LI节点
    node.parent().parent().next('.upload_btn').show();  //显示上传框
    node.remove(); //删除DOM元素
}


function fileQueueError(file, errorCode, message) {
    try {
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setError();
        progress.toggleCancel(false);
        if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
            errorName = "您选择的文件太多.";
        }
        if (errorName !== "") {
            alert(errorName);
            return;
        }

        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                progress.setStatus(file.name + "文件太小");
                progress.toggleCancel(false, this);
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                progress.setStatus(file.name + "文件太大");
                progress.toggleCancel(false, this);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                progress.setStatus(file.name + "文件类型出错");
                progress.toggleCancel(false, this);
                break;
            default:
                if (file !== null) {
                    progress.setStatus("未知错误");
                    progress.toggleCancel(false, this);
                }
                break;
        }

    } catch (ex) {
        this.debug(ex);
    }

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    try {
        if (numFilesQueued > 0) {
            this.startUpload();
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadProgress(file, bytesLoaded) {
    try {
        var percent = Math.ceil((bytesLoaded / file.size) * 100);

        var progress = new FileProgress(file, this.customSettings.upload_target);
        progress.setProgress(percent);
        if (percent === 100) {
            progress.setStatus("创建缩略图...");
            progress.toggleCancel(false, this);
        } else {
            progress.setStatus("上传...");
            progress.toggleCancel(true, this);
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    try {
        /*  I want the next upload to continue automatically so I'll call startUpload here */
        if (this.getStats().files_queued > 0) {
            this.startUpload();
        } else {
            var progress = new FileProgress(file, this.customSettings.upload_target);
            progress.setComplete();
            progress.setStatus("上传完成.");
            progress.toggleCancel(false);
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadError(file, errorCode, message) {
    var imageName = "error.gif";
    var progress;
    try {
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                try {
                    progress = new FileProgress(file, this.customSettings.upload_target);
                    progress.setCancelled();
                    progress.setStatus("Cancelled");
                    progress.toggleCancel(false);
                }
                catch (ex1) {
                    this.debug(ex1);
                }
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                try {
                    progress = new FileProgress(file, this.customSettings.upload_target);
                    progress.setCancelled();
                    progress.setStatus("Stopped");
                    progress.toggleCancel(true);
                }
                catch (ex2) {
                    this.debug(ex2);
                }
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                imageName = "uploadlimit.gif";
                break;
            default:
                alert(message);
                break;
        }
        addImage("images/" + imageName);
    } catch (ex3) {
        this.debug(ex3);
    }
}

function fadeIn(element, opacity) {
    var reduceOpacityBy = 5;
    var rate = 30; // 15 fps


    if (opacity < 100) {
        opacity += reduceOpacityBy;
        if (opacity > 100) {
            opacity = 100;
        }

        if (element.filters) {
            try {
                element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
            }
        } else {
            element.style.opacity = opacity / 100;
        }
    }

    if (opacity < 100) {
        setTimeout(function () {
            fadeIn(element, opacity);
        }, rate);
    }
}

/* ******************************************
*	FileProgress Object
*	Control object for displaying file info
* ****************************************** */

function FileProgress(file, targetID) {
    this.fileProgressID = "divFileProgress";

    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("div");
        this.fileProgressWrapper.className = "progressWrapper";
        this.fileProgressWrapper.id = this.fileProgressID;

        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";

        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));

        var progressText = document.createElement("div");
        progressText.className = "progressName";
        progressText.appendChild(document.createTextNode(file.name));

        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress";

        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";

        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);

        this.fileProgressWrapper.appendChild(this.fileProgressElement);

        document.getElementById(targetID).appendChild(this.fileProgressWrapper);
        fadeIn(this.fileProgressWrapper, 0);

    } else {
        this.fileProgressElement = this.fileProgressWrapper.firstChild;
        this.fileProgressElement.childNodes[1].firstChild.nodeValue = file.name;
    }

    this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
    this.fileProgressElement.className = "progressContainer blue";
    this.fileProgressElement.childNodes[3].className = "progressBarComplete";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

};
FileProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfuploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfuploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};
