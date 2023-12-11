---
slug: an-unusual-journey-learning-about-nns-for-a-phd-thesis
title: An unusual journey learning about NNs for a PhD thesis
date: 2021-10-22
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280497057-46ba8ff7-2f83-4fc4-8fed-350fc18246da.png
tags: ['PhD Thesis', 'Neural Networks', 'Python', 'Time Series Forecasting']
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280497057-46ba8ff7-2f83-4fc4-8fed-350fc18246da.png"/>
</p>

<br />

An unusual journey of learning about Neural Networks for a PhD thesis. This blog post details the author's experience of assisting in the programming aspect of a PhD thesis, focusing on the study of various models and their forecasting performance.

The open source code is available [here](https://github.com/DidierRLopes/UnivariateTimeSeriesForecast).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

On 14th February of 2019, my previous Maths and Statistics teacher — [Filipe](https://www.linkedin.com/in/filipe-r-ramos-a66242143/) - sent me a messaged because of a Linkedin post I shared about work I was doing in python.

It turns out that Filipe was looking for someone to help him with his PhD thesis, in specific, with the programming side of it. The challenge was to study diverse models (from classical to neural networks) and assess their forecasting performance. Since time series prediction was always a topic that I found fascinating and hadn’t had time to study, I thought this would be the perfect timing to do so.

So from February 2019 onwards, this exciting journey started. I was working full-time so in order to be able to take part in this, I was only sleeping 4/5h a day. I started reading a lot of books and practicing my python coding skills in order to be more helpful. Then around June, we started working together on the code. We had around 2–3h discussions a couple times a week where we would discuss the point of the situation code-wise and where we wanted to be, we kept in touch about this every day.

From the repo, which is open source [here](https://github.com/DidierRLopes/UnivariateTimeSeriesForecast), you can see that we explored: Exploratory Data Analysis; ARIMA and SARIMA; Exponential Smoothing; Deep Neural Network. The final part of this work consisted in an innovative approach to tackle an univariate time series, which you can find [here](https://github.com/DidierRLopes/UnivariateTimeSeriesForecast/blob/master/DNN_ourApproach.ipynb). On top of that, a library of cross-validation for Neural Networks was developed, which is now being used in real data science applications, see [here](https://github.com/DidierRLopes/timeseries-cv).

The work, which took around 1 year to complete, can be divided into 3 distinct phases:

- The **coding** phase lasted around 3 months. I would write the code, test the code and then touch base with Filipe to ensure we were going in the right direction.
- The **tweaking and analysis phase** took around another 3 months. Here, Filipe took the code I had completed and analysed multiple time series with different trends and seasonalities; tweaked different models; trained and validated these; and started interpreting results. In this phase, me and Filipe would discuss the code from a pragmatic point of view, and improve it based on what Filipe wanted to see/analyse. This phase was so intense that Filipe flew out to London twice to meet me, almost over a period of 1 month.
- The **writing of the thesis phase** took an additional 6 months. Here Filipe basically translated the results and analysis seen on the notebook of the thesis, wrote a full theoretical background on the models used and interpreted the applicability of these.

The full work, _“Data Science in the Modeling and Forecasting of Financial timeseries: from Classic methodologies to Deep Learning”_, can be found in [here](https://ciencia.iscte-iul.pt/publications/data-science-na-modelacao-e-previsao-de-series-economico-financeiras-das-metodologias-classicas-ao/82703) or stored in [here](https://repositorio.iscte-iul.pt/handle/10071/22964).

During this time, Filipe was also working full-time as he was a teaching assistant in three different universities. In spite of the adversities, Filipe achieved an impressive approved with “_unanimous distinction_” (maximum classification) from ISCTE Business School, Lisbon, Portugal.

My character waiting for people to join my chatroom to discuss our poster.

![image](https://github.com/Meg1211/my-website/assets/88618738/9222b0c5-4620-4eb1-88d3-a68a2eb71e1b)

Last week, at XXV Congress of the Portuguese Statistical Society (SPE 2021), we presented:

- A poster that you can find [here](https://www.researchgate.net/publication/355360806_Forecasting_models_for_time-series_a_comparative_study_between_classical_methodologies_and_Deep_Learning), titled: _“Forecasting models for time-series: a comparative study between classical methodologies and Deep Learning”_
- A presentation that you can find [here](https://www.researchgate.net/publication/355360897_Explorando_o_poder_da_memoria_das_redes_neuronais_LSTM_na_modelacao_e_previsao_do_PSI_20), titled: _“Explorando o poder da memória das redes neuronais LSTM na modelação e previsão do PSI 20”_

![image](https://github.com/Meg1211/my-website/assets/88618738/c5921349-99d1-46bf-878f-0ecfaedf2b1e)

The poster above was presented at XXV Congress of the Portuguese Statistical Society (SPE 2021).

I started this journey with my previous maths teacher and ended it with a close friend! Excited to see what other articles/publications we’ll be working on together in the future.

PS: The ARIMA/ETS/MLP/RNN/LSTM models learned from this work, consisted the basis of the prediction menu on [Gamestonk Terminal](https://github.com/GamestonkTerminal/GamestonkTerminal).

As always, feel free to provide feedback!
