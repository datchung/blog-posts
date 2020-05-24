[Blog Home Page](../../README.md)

# How to Clone a VM in VMware ESXi

_Tags: Administration, Virtualization, VM, VMware_

Table of Contents
1. [Introduction](#introduction)
2. [Steps](#steps)
3. [Appendix](#appendix)
4. [Comments](#comments)

##  1. <a name='introduction'></a>Introduction

VMware ESXi is a virtual machine hosting solution that is available as a "free" or paid edition. The free edition works well but lacks a dedicated UI command or wizard to clone a VM. Because of this, I will explain the simplest method that I know of to clone a VM in VMware ESXi.

## 2. <a name='steps'></a>Steps

In the following steps, the source VM is the VM to clone.

1. Log into the VMWare ESXi UI in a browser.
2. Go to the source VM.
3. Power Off the source VM.
4. Copy the source VM folder by using the built-in Datastore Browser or an alternative method like WinSCP. See the [Appendix](#appendix) section for steps on both methods.
5. Go to Storage > Register a VM.
6. Browse to the copied folder.
7. Select the *.vmx file.
8. Click Register.
9. Go to the registered VM.
10. Click on Edit > VM Options > VM Name.
11. Rename the registerd VM. VM names need to be unique in VMware ESXi, so this will prevent a conflict when the source VM is powered on later.
12. Power on the registered VM.
13. Select I Copied It when a prompt is shown.
14. Power on the source VM.

## 3. <a name='appendix'></a>Appendix

### Copy source VM folder with Datastore Browser

1. Go to Storage > Datastore Browser.
2. Locate the source VM folder.
3. Go one directory up.
4. Create a new directory.
5. Copy the *.vmx and *.vmdk files from the source VM directory to the new directory. Note that there is only one *.vmx file but there may be multiple *.vmdk files. All of them need to be copied.

### Copy source VM folder with WinSCP

1. Go to Navigator > Host > Actions > Services > Enable Secure Shell (SSH).
2. Launch WinSCP.
3. Select SFTP, enter your VMware ESXi's hostname, port number (default 22), user name (default root), and password.
4. Locate the source VM folder.
5. Copy the source VM folder.
6. Rename the copied folder.

## 4. <a name='comments'></a>Comments

_Reply to [this tweet]()._