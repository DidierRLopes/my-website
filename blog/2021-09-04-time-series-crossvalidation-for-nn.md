---
slug: time-series-crossvalidation-for-nn
title: Time-Series CrossValidation for NN
date: 2021-09-04
image: /blog/2021-09-04-time-series-crossvalidation-for-nn.webp
tags:
- python
- data-science
- deep-learning
- time-series
- cross-validation
- neural-networks
description: This blog post discusses the creation of a Python module for splitting univariate time-series data using cross-validation techniques. The module is designed to prepare data for training, validation, and testing in a Deep Neural Network (DNN).
---




<p align="center">
    <img width="600" src="/blog/2021-09-04-time-series-crossvalidation-for-nn.webp"/>
</p>

<br />

This blog post discusses the creation of a Python module for splitting univariate time-series data using cross-validation techniques. The module is designed to prepare data for training, validation, and testing in a Deep Neural Network (DNN).

The open source code is available [here](https://github.com/DidierRLopes/timeseries-cv).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

2 years ago, [Filipe Ramos](https://www.linkedin.com/in/ACoAACK9n24BrpxWf0HMa9bL7MSHleu2YVXpI5E) my previous maths and probability teacher, knowing that I had a special interest in Data Science, challenged me to help him in his PhD thesis “_Data Science na Modelação e Previsão de Séries Económico-financeiras: das Metodologias Clássicas ao Deep Learning_”.

Although we have been discussing theory, analysis and results, my main contribution was to write the Python code behind the thesis.

As a result, I have written a python module that splits a given univariate time-series based on cross-validation techniques so that these can be fed to a Deep Neural Network (DNN) to extract training/validation/test errors.

I know that there are examples of these online, but this was made from scratch so that we could personalise it according to the thesis’ needs, and grasp better what was at stake when performing different cross-validation techniques.

**The idea is given a training dataset, the package will split it into Train, Validation and Test sets, by means of either Forward Chaining, K-Fold or Group K-Fold.**

As parameters the user can not only select the number of inputs (`n_steps_input`) and outputs (`n_steps_forecast`), but also the number of samples (`n_steps_jump`) to jump in the data to train.

The best way to install the package is as follows: `pip install timeseries-cv` and then use it with `import tsxv`. See the module developed [here](https://pypi.org/project/timeseries-cv/).

This can be seen more intuitively using the jupyter notebook: “_example.ipynb_” Below you can find an example of the usage of each function for the following Time-Series:

```python
timeSeries = array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26])
```

## Split Train

```python
from tsxv.splitTrain import 
split_train, 
split_train_variableInput
X, y = split_train(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y = split_train_variableInput(timeSeries, minSamplesTrain=10, n_steps_forecast=3, n_steps_jump=3)
```

<div className="flex justify-center gap-2">
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_1.webp" width="50%" />
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_2.webp" width="50%" /> 
</div>

## Split Train Val

```python
from tsxv.splitTrainVal import 
split_train_val_forwardChaining, 
split_train_val_kFold, 
split_train_val_groupKFold
X, y, Xcv, ycv = split_train_val_forwardChaining(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv = split_train_val_kFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv = split_train_val_groupKFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
```

<div className="flex justify-center gap-2">
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_3.webp" width="50%" />
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_4.webp" width="50%" /> 
</div>

<br />

![image](/blog/2021-09-04-time-series-crossvalidation-for-nn_5.webp)

## Split Train Val Test

```python
from tsxv.splitTrainValTest import split_train_val_test_forwardChaining, 
split_train_val_test_kFold,
split_train_val_test_groupKFold
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_forwardChaining(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_kFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
X, y, Xcv, ycv, Xtest, ytest = split_train_val_test_groupKFold(timeSeries, n_steps_input=4, n_steps_forecast=3, n_steps_jump=2)
```

<div className="flex justify-center gap-2">
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_6.webp" width="50%" />
  <img src="/blog/2021-09-04-time-series-crossvalidation-for-nn_7.webp" width="50%" /> 
</div>

<br />

![image](/blog/2021-09-04-time-series-crossvalidation-for-nn_8.webp)

This module has not only been used for my friends’ thesis but also for a Data Science company and [Gamestonk Terminal](/blog/gamestonk-terminal-the-next-best-thing-after-bloomberg-terminal), that I know of :)

You can check the stats of the module [here](https://pypistats.org/packages/timeseries-cv).
