---
slug: time-series-crossvalidation-for-nn
title: Time-Series CrossValidation for NN
date: 2021-09-04
image: https://github.com/Meg1211/my-website/assets/88618738/19a411e1-bb34-44bf-a9b8-b2a3ba4dd5f6
tags: ['Python', 'Data Science', 'Deep Learning', 'Time Series', 'Cross Validation', 'Neural Networks']
---

This blog post discusses the creation of a Python module for splitting univariate time-series data using cross-validation techniques. The module is designed to prepare data for training, validation, and testing in a Deep Neural Network (DNN).
<!-- truncate -->

https://github.com/DidierRLopes/timeseries-cv

2 years ago, Filipe Ramos my previous maths and probability teacher, knowing that I had a special interest in Data Science, challenged me to help him in his PhD thesis “Data Science na Modelação e Previsão de Séries Económico-financeiras: das Metodologias Clássicas ao Deep Learning”.

Although we have been discussing theory, analysis and results, my main contribution was to write the Python code behind the thesis.

As a result, I have written a python module that splits a given univariate time-series based on cross-validation techniques so that these can be fed to a Deep Neural Network (DNN) to extract training/validation/test errors.

I know that there are examples of these online, but this was made from scratch so that we could personalise it according to the thesis’ needs, and grasp better what was at stake when performing different cross-validation techniques.

**The idea is given a training dataset, the package will split it into Train, Validation and Test sets, by means of either Forward Chaining, K-Fold or Group K-Fold.**

As parameters the user can not only select the number of inputs (n_steps_input) and outputs (n_steps_forecast), but also the number of samples (n_steps_jump) to jump in the data to train.

The best way to install the package is as follows: pip install timeseries-cv and then use it with import tsxv. See the module developed here.

This can be seen more intuitively using the jupyter notebook: “example.ipynb” Below you can find an example of the usage of each function for the following Time-Series:

timeSeries = array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26])

## Split Train
from tsxv.splitTrain import 
split_train, 
split_train_variableInput
X, y = split_train(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y = split_train_variableInput(timeSeries, minSamplesTrain=10, n_steps_forecast=3, n_steps_jump=3)

![image](https://github.com/Meg1211/my-website/assets/88618738/ed1e87cf-677b-4e45-8885-eeea806b9e46)
![image](https://github.com/Meg1211/my-website/assets/88618738/9485b3c7-ee78-4de4-888c-73f857bcfaff)

## Split Train Val

from tsxv.splitTrainVal import 
split_train_val_forwardChaining, 
split_train_val_kFold, 
split_train_val_groupKFold
X, y, Xcv, ycv = split_train_val_forwardChaining(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv = split_train_val_kFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv = split_train_val_groupKFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)

![image](https://github.com/Meg1211/my-website/assets/88618738/567aa0f6-da16-4320-9c25-bfc9c8175221)
![image](https://github.com/Meg1211/my-website/assets/88618738/220c0c44-f3ef-4055-a94b-2561945fe93f)
![image](https://github.com/Meg1211/my-website/assets/88618738/24cfab68-28cb-4652-9196-fa53ac8d3ed4)

## Split Train Val Test

from tsxv.splitTrainValTest import split_train_val_test_forwardChaining, 
split_train_val_test_kFold,
split_train_val_test_groupKFold
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_forwardChaining(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_kFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_groupKFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)

![image](https://github.com/Meg1211/my-website/assets/88618738/745831b0-1146-407a-8a09-de0d3a728ae4)
![image](https://github.com/Meg1211/my-website/assets/88618738/35574b90-23ad-4014-b7f9-739e8632a9bb)
![image](https://github.com/Meg1211/my-website/assets/88618738/19a411e1-bb34-44bf-a9b8-b2a3ba4dd5f6)

This module has not only been used for my friends’ thesis but also for a Data Science company and Gamestonk Terminal, that I know of :)

You can check the stats of the module here.

Have a great weekend,
Didier

