---
title: "Who logs in when the user is an AI?"
number: 3
lang: en
alternateLanguage:
  lang: it
  slug: chi-fa-login-quando-lutente-e-un-ai
date: "2026-08-25"
excerpt: "AI agents are starting to act on our behalf. But when they access a service, who is actually authenticating: us, the agent, or both?"
tags:
  - AI
  - Authentication
  - Software Engineering
socialImage: "/og-article-3-en.png"
---

# Dal mio Lab #3 <br class="mobile-title-break">— Who logs in when the user is an AI?

For years, we designed authentication systems with one fairly simple assumption:

**there is a person on the other side.**

A person opens a website.

They enter a password.

They confirm a code.

They touch a biometric sensor.

They press “Continue with Google”.

One way or another, there is always a human being who says:

> Yes, that’s me.

Then we started building AI agents.

And suddenly that assumption began to creak.

## When AI stops merely answering

As long as a model receives a question and returns text, the problem is relatively simple.

The user is still clearly the person sitting in front of the screen.

But agents are starting to do something different.

They can:

- call APIs;
- read and modify documents;
- create issues;
- work on repositories;
- book services;
- query business systems;
- coordinate with other agents;
- keep working when the user is no longer in front of the computer.

At that point, a seemingly obvious question appears:

**who is authenticating?**

Me?

My agent?

Both?

## A very simple example

Imagine that I have a personal AI agent.

I ask it:

> Check my open tasks, see what has changed in the repositories, and prepare whatever is needed for tomorrow.

To do that, it needs to access several services.

GitHub.

A task manager.

Maybe Google Drive.

Perhaps a business platform.

How should it authenticate?

I could give it my credentials.

That sentence alone should create a little discomfort. 😄

I could create a separate account.

But then what does that account represent?

The agent?

Me?

An agent working for me?

I could use API keys.

But then I have to manage keys, scopes, expiration and revocation for every service.

OAuth?

Probably, in many cases.

But even then, a deeper question remains:

**is the service authorizing me, or is it authorizing software to act on my behalf?**

They may look like the same thing.

They are not.

## Identity and authorization are two different problems

Suppose a service can identify my agent perfectly.

Great.

We know who it is.

But we still do not know:

- who controls it;
- on whose behalf it is acting;
- what it can do;
- which resources it can access;
- for how long;
- whether it can delegate part of the work;
- what happens when that delegation ends.

Knowing **who you are** does not mean knowing **what you can do**.

And knowing what you can do does not mean knowing **on whose behalf you are doing it**.

With people, we often compress all of this into one concept: the account.

With AI agents, I suspect that shortcut will work less and less often.

## “This is Paolo” is not the same as “this agent works for Paolo”

That distinction will become fundamental, in my view.

A service might receive a request and know that it comes from an agent belonging to Paolo.

But that should not automatically mean:

> Treat it as Paolo.

I might want to authorize an agent to read my calendar.

Not delete it.

I might allow it to create a pull request.

Not merge it.

I might allow it to book a hotel within a certain budget.

Not buy anything using my payment method.

So the question changes.

It is no longer enough to ask:

> Who is this user?

We will probably need to start asking:

> **What entity is this, on whose behalf is it acting, and what is it authorized to do right now?**

Those are three different pieces of information.

## What if agents start delegating?

This is where things get even more entertaining. 😄

Imagine that my main agent needs to organize a trip.

It could delegate the flight search to one agent.

Hotels to another.

Calendar verification to a third.

At that point, we have a small chain:

**me → main agent → specialist agent**

Who authorizes the last agent?

Does it need to receive authorization directly from me?

Can it receive it from the main agent?

Can it delegate it further?

For how long?

How do I revoke just one branch of the chain without blocking everything?

And, above all:

**how can the service receiving the request verify this chain without simply trusting what the agent claims?**

In a distributed system, “trust me, Paolo said I could do it” does not strike me as a particularly promising protocol. 😄

## Then there are the devices

Another thing we often take for granted today is the device.

I can authenticate from my phone.

From my laptop.

From a new computer.

I can lose one and revoke it.

I can add another.

But what happens to an agent?

It might live on my laptop today and on a server tomorrow.

It might run locally.

In the cloud.

On a home AI node.

Can it change machines without changing its identity?

Does its identity belong to the process that is running?

To the machine?

To the owner?

To a profile?

To a cryptographic key?

And if the device is compromised, how do we distinguish the compromised device from the agent’s identity?

These are questions we often do not even have to ask in ordinary login flows.

With agents, they become difficult to avoid.

## Do service accounts and API keys really solve the problem?

Of course, we are not starting from zero.

Computer systems have managed non-human identities for a very long time.

Service accounts.

API keys.

Client credentials.

Certificates.

Tokens.

OAuth.

So one possible answer is:

> We already have all the tools we need.

Maybe.

But I suspect there is an important difference.

A traditional service account normally represents **a service**.

An AI agent might represent something much more ambiguous:

software with its own identity that, at different times, can operate on behalf of different people, with different permissions and different levels of autonomy.

It is not simply:

**machine-to-machine.**

There is a delegation relationship.

And that relationship might become just as important as the identity itself.

## What about MCP?

Part of this problem is already starting to be addressed.

The **Model Context Protocol (MCP)** is becoming one of the main standards through which models and agents can discover and use tools, resources and services.

Over time, the protocol has also strengthened its authorization story, integrating with mechanisms such as OAuth and addressing more explicitly the relationship between clients, authorization servers and resource servers.

That matters.

MCP can help standardize **how an agent accesses a tool** and how it obtains the authorization required to use it.

But a broader question remains:

> **Who is the agent using that tool, who does it belong to, and on whose behalf is it acting?**

The two things are not necessarily alternatives.

They could simply be two layers of the same problem.

MCP can tell us how an agent calls a GitHub tool in a standard way.

OAuth can establish which permissions it has.

But we might still need to know that:

- that agent belongs to Paolo;
- it is acting on Paolo’s behalf;
- it can create a pull request;
- it cannot merge one;
- that delegation is valid only for a certain period;
- it cannot necessarily transfer that same authority to another agent.

So the question I am interested in is not:

> Does MCP solve the problem or not?

It is more like this:

> **Are MCP + OAuth enough to represent agent identity, ownership and delegation as well, or is another layer still missing?**

It is one of the questions I would be especially curious to hear from people who are already building systems like this.

## And what about responsibility?

Then there is the question that always arrives sooner or later.

An agent takes the wrong action.

Who did it?

The agent?

The agent’s owner?

The person who gave it the instruction?

The system that granted it authorization?

In many cases, the legal answer will depend on the context.

But from a technical point of view, we still need to be able to reconstruct what happened.

It is not enough to know:

> This API was called at 10:42.

It might be much more useful to know:

> This agent, belonging to this subject, performed this operation on the basis of this authorization.

Identity, ownership, delegation and audit begin to intertwine.

And that is where the problem becomes much bigger than a simple login.

## Maybe we are using too small a word

At first, I tended to think of all this as an authentication problem.

I still think authentication is an important part of it.

But the more I think about it, the more the word seems too small.

The real problem might be something like this:

**identity + ownership + authorization + delegation.**

Who you are.

Who you belong to.

On whose behalf you are acting.

What you can do.

Who granted you that right.

And how that right can be revoked.

With humans, we built these things progressively over the course of decades.

With AI agents, we are trying to assemble them while agents are becoming more and more capable.

## In the Lab, this question is taking us quite far

Over the last few months, we have been working quite a lot in the Lab on authentication, identity and ownership.

It started with a much simpler question:

> Can we make passwordless authentication simpler and more natural?

But as we worked on it, concepts appeared that we had not initially expected to matter as much.

Profiles.

Ownership.

Devices.

Services.

Non-human identities.

Governance.

Delegation.

And it became difficult not to see the connection with what is happening in the world of AI agents.

I still do not know what the right answer to this problem is.

And, above all, I do not want to start by assuming that we already have it.

First, I am interested in understanding something much more important:

**does this problem actually exist outside our Lab?**

## How are you approaching it?

If you are building AI agents, multi-agent systems or services that could eventually be used directly by agents, I am genuinely curious to understand how you are approaching these questions.

How do you authenticate agents?

Do you use separate accounts?

Service accounts?

OAuth?

API keys?

MCP?

How do you represent the relationship between an agent and a person?

How do you manage delegation?

And what happens when an agent has to act across several different services?

I am not looking for the “right” answer.

I am mostly interested in the problems you have run into.
