---
slug: how-to-handle-equity-top-ups-at-a-seed-stage-startup
title: How to handle equity top-ups at a seed stage startup
authors: didier
date: 2023-08-09
image: https://github.com/Meg1211/my-website/assets/88618738/db55c35d-e5f3-4cfc-b200-5fe2f2690285
tags: ['equity', 'startups', 'seed stage', 'equity top-ups', 'employee compensation']
---

In this post, we discuss how to handle equity top-ups at a seed stage startup, providing a step-by-step guide on the implementation process and including links to relevant spreadsheets.

<!-- truncate -->

Previously, I shared how we handle equity at OpenBB in this post.

This blog post will continue that discussion and go over how we approach equity top-ups at OpenBB. It will provide a step-by-step guide on the implementation process and include links to relevant spreadsheets that you can use for your own startup.

I will continue using the purely fictional example that I introduced in the previous blog post with John Doe.

Let’s imagine that John Doe was indeed the right candidate for OpenBB, and on June 15, 2021, he was hired and accepted an offer with 2000 options vesting over the next 4 years with a 1-year cliff. For simplicity, let’s assume that he will vest the 2000 shares by July 1, 2025 (ignoring the additional 2 weeks).

This means that by the end of June 2022, John will have vested 542 shares (13 x 2000 / 48), and for every following month, he will vest 42 shares per month. Note that we only start showing the shares from June 2022 because before that, he was in his cliff period.

![image](https://github.com/Meg1211/my-website/assets/88618738/6072f982-94a0-43c1-8183-c62439569d22)

If you do this calculation, you’ll see that it adds up to 2022, whereas John was only granted 2000 shares. This is normal and is due to rounding, thus the shares associated with the last month are updated so that it matches the offer.

![image](https://github.com/Meg1211/my-website/assets/88618738/5df51c85-512a-4c7b-8c7b-838a13892a90)

If any of the following situations arise:

1. The initial assessment of the candidate was wrong, and they are not an IC but a Sr. IC.
2. The employee has exceeded expectations, and their equity no longer reflects the value they bring to the company.
3. The employee has other job offers, and you want to reinforce that they are an owner of the company and that their success is important.
4. The employee’s vesting period is coming to an end, and they are considering leaving as they joined the company for the potential upside of an exit.

One option you have is to increase cash compensation. However, offering equity (ownership) is often a better option, especially for startups with limited cash resources.

In these situations, you need to consider an equity top-up. This means offering the employee a new equity grant on top of the shares they are currently vesting. There are multiple types of equity grants, but I will focus on the approach we use at OpenBB and explain how you can implement it as well.

First, determine how many additional shares you want to grant to the individual and, more importantly, how many shares would be fair for them to vest each month. The former helps determine their stake in the company, while the latter helps assess their value compared to other team members.

In our case, let’s assume it’s February 2023, and John has been with the company for 20 months. We want to reward his contributions and bet on his future at the company, so we decide to grant him an additional 1,500 shares on top of his existing 2,000 shares.

In theory, some companies start a new 4-year vesting period with a 1-year cliff for the second grant. However, the issue with that approach is that the employee will start vesting two grants simultaneously: 2000/48 + 1500/48 shares per month. Once the first grant is fully vested, they will vest a lower amount of shares per month: 1500/48. This means the employee would have less incentive to stay when only the second grant is being executed.

To address this, we ensure that for the next 4 years from the vesting commencement date (VCD) of the second grant, the employee vests the same number of shares each month.

## How can we do that?

Here is the information we have:

- 1st option grant VCD: 15 June 2021
- 1st option grant shares: 2,000
- 1st option grant schedule: 1/48 per month with 1 year cliff finishing on 30 June 2025

From here, we infer that in February 2023, John is vesting 42 shares per month and has already vested 542 shares (after the 1-year cliff) + 294 shares (7 x 42).

Now, let’s discuss the decisions we need to make for the second option grant:

- 2nd option grant VCD: We want to start it ASAP, to retain employee — for instance March 2023
- 2nd option grant shares: around 1,500
- 2nd option grant schedule: 1/48 per month finishing on 30 March 2027. Note that we removed the cliff since we know the value the employee brings and that “protection”/”retainer” can be removed.

By utilizing maths, we can create the following equation:

![image](https://github.com/Meg1211/my-website/assets/88618738/6fef3777-e0f4-4f6b-8aec-2beda3548d9e)

By filling in the information that we know, we get:

![image](https://github.com/Meg1211/my-website/assets/88618738/b6a45d13-ba87-4483-b978-c134de992535)

And thus we know that we can get the value that makes this happen.

![image](https://github.com/Meg1211/my-website/assets/88618738/a59b01d5-ae2f-46b7-8fa1-2ca271c683d1)

However, we don’t want to give the employee fractional shares each month, so we select a round number around the one that makes him receive around 1,500 additional shares over the course of 4 years.

In this case, that number could be 55. This means that the top-up number would be 13 (55–42), except on the last month of vesting for the 1st grant where we need the adjustment.

When we multiply 55 shares per month for the next 48 months starting in March 2023, that adds up to 2,640.

However, the employee was awarded 1,500 shares (2nd grant) and still has 27 months (from March 2023 to May 2025) to vest 1st grant shares, which corresponds to a total of 1,122 shares (42 * 26 + 30, remembering the adjustment done for the last month). This total would be 2,622, which obviously is different from the expected 2,640.

Therefore, we update the value of the number of shares given on the 2nd grant so that John receives 55 shares per month. In this case, for that to happen, the 2nd grant has to have a value of 1,573.

But obviously, you don’t need to pick up your calculator every time you do this. I mean, what kind of engineer would I be if I didn’t somehow automate this?

**Automated version**

The spreadsheet below demonstrates what an employee vesting schedule looks like, and below I will write a step-by-step guide so you can fully customize it to your needs.

![image](https://github.com/Meg1211/my-website/assets/88618738/db55c35d-e5f3-4cfc-b200-5fe2f2690285)

- As a result, E5 will be updated with 11 months afterward to represent the month before the cliff terminates, which consequently leads to the following months being displayed in column E.

2. Fill in the 1st grant shares in B5

- As a result, G6 is updated with the total shares from the 1st grants vested after the 1st year. The following rows in column G are automatically updated until the vesting schedule terminates.

3. Adjust G41 so that the sum of shares in column G match the shares from the 1st grant in B5.

4. Fill in the top up grant vesting commencement date (VCD) in C6

- As a result, column H will automatically get populated based on the value that, when added with the cells in column G, returns the value in cell B19.
- This will also allow us to compute the months that have already been vested from the initial shares in B11 and consequently calculate the overlap between shares coming from the 1st and 2nd grant in B12.

5. Fill in the top-up grant shares that you are thinking about offering to the employee in B6.

- As a result, the same computations that were explained earlier in theory will occur. This will result in a recommendation for the top-up shares in B15 and consequently the amount of shares that the employee will vest monthly in B16 so that the amount of top-up grant shares is met.

6. It is very likely that the number in B16 will not be rounded. Hence, we fill B19 with a rounded version of that number.

- As a result, column H will be updated so that the total shares (from both grants) in column F matches the selected value in B19.

When looking at the total top-up shares in H67, that value will no longer match the total top-up shares that we wanted to grant to the employee and that we decided at the beginning in B6. This is because we rounded the value and thus impacted the number of shares necessary to achieve that.

The amount of shares needed to update the recommendation in B16 to the rounded version in B19 is displayed as an “error” in B21.

7. In order to fix that, we simply need to update B6 with the sum of B6 and the error value from B21.

- As a result of this, all the values should now match, and the combined total amount of shares given to the employee in B8 should match the sum of the shares spread across dates in F67. Plus, the error should now be null in cell B21.

And that’s it.

## Conclusion

I hope you found this useful and are able to use it internally to share with your employees so they understand how the top-ups happen at your startup.

If you want access to this Excel template, feel free to reach out to me on Twitter or LinkedIn.
