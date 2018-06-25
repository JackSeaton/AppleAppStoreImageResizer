# AppleAppStoreImageResizer
Provide a single image and receive all the required icon sizes

An example can be seen in the project

### How does this work?
Set a `resize.png` image (as hi res as possible) in the root of the project.

After that you can run:
```
$ node index.js
```

The resulting images will be put into a directory
```
AppIcons/<YYYY-MM-DD_HH.mm.ss.S>/
```

with each file being named after what it is.

Ex:
```
AppIcon-29px@3x.png
```
