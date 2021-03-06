// **********************************************************************
//
// Copyright (c) 2003-2017 ZeroC, Inc. All rights reserved.
//
// This copy of Ice is licensed to you under the terms described in the
// ICE_LICENSE file included in this distribution.
//
// **********************************************************************
//
// Ice version 3.6.4
//
// <auto-generated>
//
// Generated from file `image.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

(function(module, require, exports)
{
    var Ice = require("ice").Ice;
    var __M = Ice.__M;
    var jderobot = require("jderobot/common").jderobot;
    var Slice = Ice.Slice;

    /**
     * Static description of the image source.
     **/
    jderobot.ImageDescription = Slice.defineObject(
        function(width, height, size, format, md5sum)
        {
            Ice.Object.call(this);
            this.width = width !== undefined ? width : 0;
            this.height = height !== undefined ? height : 0;
            this.size = size !== undefined ? size : 0;
            this.format = format !== undefined ? format : "";
            this.md5sum = md5sum !== undefined ? md5sum : "";
        },
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::jderobot::ImageDescription"
        ],
        -1,
        function(__os)
        {
            __os.writeInt(this.width);
            __os.writeInt(this.height);
            __os.writeInt(this.size);
            __os.writeString(this.format);
            __os.writeString(this.md5sum);
        },
        function(__is)
        {
            this.width = __is.readInt();
            this.height = __is.readInt();
            this.size = __is.readInt();
            this.format = __is.readString();
            this.md5sum = __is.readString();
        },
        false);

    jderobot.ImageDescriptionPrx = Slice.defineProxy(Ice.ObjectPrx, jderobot.ImageDescription.ice_staticId, undefined);

    Slice.defineOperations(jderobot.ImageDescription, jderobot.ImageDescriptionPrx);

    /**
     * A single image served as a sequence of bytes
     **/
    jderobot.ImageData = Slice.defineObject(
        function(timeStamp, description, pixelData)
        {
            Ice.Object.call(this);
            this.timeStamp = timeStamp !== undefined ? timeStamp : new jderobot.Time();
            this.description = description !== undefined ? description : null;
            this.pixelData = pixelData !== undefined ? pixelData : null;
        },
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::jderobot::ImageData"
        ],
        -1,
        function(__os)
        {
            jderobot.Time.write(__os, this.timeStamp);
            __os.writeObject(this.description);
            jderobot.ByteSeqHelper.write(__os, this.pixelData);
        },
        function(__is)
        {
            var self = this;
            this.timeStamp = jderobot.Time.read(__is, this.timeStamp);
            __is.readObject(function(__o){ self.description = __o; }, jderobot.ImageDescription);
            this.pixelData = jderobot.ByteSeqHelper.read(__is);
        },
        false);

    jderobot.ImageDataPrx = Slice.defineProxy(Ice.ObjectPrx, jderobot.ImageData.ice_staticId, undefined);

    Slice.defineOperations(jderobot.ImageData, jderobot.ImageDataPrx);

    jderobot.ImageConsumer = Slice.defineObject(
        undefined,
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::jderobot::ImageConsumer"
        ],
        -1, undefined, undefined, false);

    jderobot.ImageConsumerPrx = Slice.defineProxy(Ice.ObjectPrx, jderobot.ImageConsumer.ice_staticId, undefined);

    Slice.defineOperations(jderobot.ImageConsumer, jderobot.ImageConsumerPrx,
    {
        "report": [, , , , , , [["jderobot.ImageData", true]], , , true, ]
    });
    Slice.defineSequence(jderobot, "ImageFormatHelper", "Ice.StringHelper", false);

    /**
     * Interface to the image provider.
     **/
    jderobot.ImageProvider = Slice.defineObject(
        undefined,
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::jderobot::ImageProvider"
        ],
        -1, undefined, undefined, false);

    jderobot.ImageProviderPrx = Slice.defineProxy(Ice.ObjectPrx, jderobot.ImageProvider.ice_staticId, undefined);

    Slice.defineOperations(jderobot.ImageProvider, jderobot.ImageProviderPrx,
    {
        "getImageDescription": [, 2, 2, , , ["jderobot.ImageDescription", true], , , , , true],
        "getImageFormat": [, 2, 2, , , ["jderobot.ImageFormatHelper"], , , , , ],
        "getImageData": [, 2, 2, 1, , ["jderobot.ImageData", true], [[7]], , 
        [
            jderobot.DataNotExistException,
            jderobot.HardwareFailedException
        ], , true]
    });
    exports.jderobot = jderobot;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require : this.Ice.__require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports : this));
