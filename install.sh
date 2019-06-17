#!/bin/bash
mkdir -p /usr/share/gowebcat
rm -rf /usr/share/gowebcat/*
cp -r dist /usr/share/gowebcat/
cp gowebcat /usr/share/gowebcat/
cp config.json /usr/share/gowebcat/
chmod -R 755 /usr/share/gowebcat
cp gowebcat.service /lib/systemd/system/
systemctl enable gowebcat.service
systemctl daemon-reload
systemctl restart gowebcat.service
exit 0