set JAVA_HOME=c:\Progra~1\Java\jdk1.7.0_171
adb connect localhost:5556
ant debug
adb install -r bin\GoS-debug.apk