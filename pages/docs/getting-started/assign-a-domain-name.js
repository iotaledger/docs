import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'
import { InternalLink } from '../../../components/text/link'
import { HR } from '../../../components/text/paragraph'

// prettier-ignore
export default withDoc({
  title: 'Assign a Domain Name',
  date: '2 August 2017',
  authors: [arunoda],
})(markdown(components)`

When you deploy an app with ▲now, you will have a unique deployment URL like this: <https://my-web-app-avvuiuuwto.now.sh>.

If you deploy your app multiple times, you will have multiple URLs. With these different deployment URLs, you can easily point users to a specific version of your app.

However, you cannot ask your users to visit those addresses. This is because the addresses are not easy to remember and they change every time you deploy a new version.

Hence, you need a static domain name.

${
  <Image
    src={`${ASSETS_URL}/docs/assign-a-domain-name/custom-domain.png`}
    width={600}
    height={325}
    caption="Our sample static app with a custom domain name."
  />
}

In this guide, we are going to map a domain name into one of those deployment URLs of your app by using the \`now alias\` command.

The four different ways to use the \`now alias\` command are:

1. ${<InternalLink href="#1.-using-a-now.sh-domain">Using a now.sh domain</InternalLink>}
2. ${<InternalLink href="#2.-using-a-custom-domain,-managed-by-▲now">Using a custom domain, managed by ▲now</InternalLink>}
3. ${<InternalLink href="#3.-using-a-custom-domain,-dns-managed-by-▲now">Using a custom domain, DNS managed by ▲now</InternalLink>}
4. ${<InternalLink href="#4.-using-a-custom-domain-with-a-cname">Using a custom domain with a CNAME</InternalLink>}

Let us explore each method in detail.

> Custom domains are only available for [paid plans](https://zeit.co/pricing). If you want to use a custom domain for your app, you need to [upgrade](https://zeit.co/account/plan) your account.

${<HR/>}

## 1. Using a now.sh Domain

This method is the easiest way to use a domain name. To obtain a domain name with the \`now.sh\` postfix instantly, simply run the following command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app</TerminalInput>}

Your users may now access the above deployment URL using <https://my-web-app.now.sh>

## 2. Using a custom domain, managed by ▲now

If you want to use a custom domain for your app, the easiest method is to buy a domain name for your app using ▲now.

Simply run the following now alias command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com</TerminalInput>}

Here, we are attempting to assign the \`my-web-app.com\` domain name to the above deployment URL. If the domain name is available, you may confirm and buy it without leaving the terminal.

After the confirmation, ▲now will handle all the technical details for you and allow your users to access your app using <https://my-web-app.com>.

${
  <Image
    src={`${ASSETS_URL}/docs/assign-a-domain-name/buy-domain.png`}
    width={650}
    height={412}
    caption="Confirmation you'll get after assigning a custom domain."
  />
}

> In this process, ▲now will set up a [Let's Encrypt](https://letsencrypt.org/) SSL certificate for your domain automatically.

## 3. Using a custom domain, DNS managed by ▲now

If you already have a domain name, this is the best option for you. With this method, ▲now will handle all the DNS management for your domain.

### Setup

First of all, you need to point your domain's nameservers to our [global DNS service](https://zeit.co/world). Here is how to do that:

* Visit your domain name provider and find a place where you can add custom nameservers.
* Select two or more nameservers from [this list](https://zeit.co/world#get-started).
* Set them as custom nameservers for your domain.

For example, assume that your domain name is \`my-custom-domain.com\`.

After you have set up the nameservers, simply run the following \`now alias\` command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-custom-domain.com</TerminalInput>}

Then, you can access your app using <https://my-custom-domain.com>.

You can also use a subdomain of \`my-custom-domain.com\` like this:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh ui.my-custom-domain.com</TerminalInput>}

> Even in this process, ▲now will set up a [Let's Encrypt](https://letsencrypt.org/) SSL certificate for your domain automatically.

## 4. Using a custom domain with a CNAME

If you are managing a DNS setup for your domain, you can use this option.

For example, assume you have a domain name called \`my-app.work\` and you already have a DNS setup for that.

To map the \`ui.my-app.work\` domain for one of the deployment URLs of your app, visit your DNS provider and add a CNAME record for \`ui.my-app.work\` pointing to \`alias.zeit.co\`.

After that, run the following command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh ui.my-app.work</TerminalInput>}

You will then have an error like this:

${
  <Image
    src={`${ASSETS_URL}/docs/assign-a-domain-name/alias-error.png`}
    width={650}
    height={412}
    caption="Error message you'll get when trying to alias a domain for the first time."
  />
}

▲now wan't to verify the ownership of your domain. That's why it throws an error.

* Next, add the TXT record as mentioned above error message.
* Run the \`now alias\` command again:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh ui.my-app.work</TerminalInput>}

Now you may access your app using <https://ui.my-app.work>

> In this case, ▲now will setup a [Let's Encrypt](https://letsencrypt.org/) SSL certificate for your domain. However, before you do that, you need to verify the domain.

### Naked domains

You can also use a naked domain like \`my-app.work\` with this method. In that case, you need to use a [ALIAS](https://support.dnsimple.com/articles/alias-record/) record instead of a CNAME record.

Some DNS providers do not have ALIAS records. In that case, the functionality of ALIAS records is managed using CNAME records.

`)
