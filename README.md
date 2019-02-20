[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
[![Build Status](https://travis-ci.org/andead/octouri.svg?branch=master)](https://travis-ci.org/andead/octouri)

# Octouri

A simple UI for navigating environments and machines using Octopus Deploy API.

## Configuration

1. Launch the application (or click on the `Settings` icon in the upper-right corner).
2. Input the URL of your Octopus installation and the API key (from your Octopus profile page).
3. Click `Apply`. The settings will be saved in your profile folder (usually AppData). 

## Usage

At the startup, the application will attempt to connect to your Octopus instance according to the settings you provided. 

From now on you can select the environment from the dropdown in the top panel and browse the list of machines, seeing their health status, IP addresses and roles. You may also open the RDP client or open Explorer to browse drive C:\\.

## Platforms

The application is built using Electron and can be compiled for any platform, although the features for launching RDP and explorer only make sense on Windows.

## History

The first version was a console app written on .NET Core and used CommandLineParser to accept environment names and returned the output in console. It worked well enough for me, although some of my colleagues expressed a strong wish for it having a UI. 

[Johnny Olsa](https://github.com/jolsa), who had largely contributed to the first version, then created version 2 which got the first UI based on Windows Forms. It had some cool features such as generating database connection strings which is something quite common for developers on a large project.

A couple of months later I decided to try my skills of a front end developer and rewrote the app completely using JavaScript and Electron, the version 3.0 that finally got its repo here, on GitHub. The UI components were taken from [MaterialDesign](https://material.io/) and for querying Octopus API – [fetch()](https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en), which combined with the ability to turn off CORS checks in an Electron app proved very powerful. 

As the app became open source, I thought it must be abstract enough for wider usage. So the database connection strings generator feature had to be removed, because it relied on a set of magic strings and numbers we used on our projects. However, other nice features stayed the same, hopefully having become more attractive with the new styles. 
