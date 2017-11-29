import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { jamo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Migrate Your App to now Without a Downtime',
  date: '04 Apr 2017 9:42 AM PDT',
  authors: [jamo, rauchg],
})(markdown(components)`

Migrations between different hosting services can be a daunting task. To help you migrate your current deployments to ${<Now color="#000"/>}, we have prepared this step-by-step guide.

In order to avoid any downtime at all, we will take a few extra steps from the typical ${<InternalLink href="/docs/features/aliases">now alias</InternalLink>} workflow.

## Preparation and Migration

1. Deploy to Now
2. Adding Your Domain
3. Upload SSL Certificates
4. Update DNS Records

## After you Migrate

1. Set Up Automatic SSL Certificate Renewal
2. Use \`zeit.world\` Nameservers

## Preparation

The first phase involves setting up your project in our infrastructure and ensuring everything is running smoothly.

### 1. Deploy to now

In the very first step, we need deploy the project to ${<Now color="#000"/>}. For most apps, all it takes is to run \`now\` in your project's directory. Please check out our ${<InternalLink href="/docs/getting-started/five-minute-guide-to-now">Getting Started</InternalLink>} section in our documentation center for more details.

It is important to make sure the deployment is working before sending live production traffic to it. Take some time to ensure the deployment is working correctly.

### 2. Adding Your Domain

Typically, adding a domain name to our system involves a verification step to ensure DNS settings are correct.

Since DNS updates tend to take a while to propagate, this process would probably result in some potential downtime of a few minutes while your nameserver changes reflect.

To avoid this situation, we can first register the domain name as **external**, by retaining your current DNS provider.
To register your domain \`example.ai\` in our system, run:

${
  <TerminalInput>
    now domains add --external example.ai
  </TerminalInput>
}

Initially, the command will output something like this:

${
  <TerminalOutput>
    &gt; Error! Verification required: Please add the following TXT record on the
    external DNS server: _now.example.ai: b0981886d2c312e35c6b311cddd4eb0aea2e71a97d1e068b25f569527880f1bd
  </TerminalOutput>
}

After you add this record in your DNS provider, you can re-run the initial command and it will succeed. You should get a message like this:

${
  <TerminalOutput>
    &gt; Success! Domain example.ai (p3wTrMPkzpnKqoH6ml9xpfbj) added [3s]
  </TerminalOutput>
}

Now we are almost ready to update the DNS records to route traffic to your new now deployment. However, since all now deployments are served only over HTTPS, we need to provision an SSL certificate before we can proceed with the migration.

### 3. Upload SSL Certificates

When you run \`now alias\` for a new project, SSL certificates are automatically provisioned and configured for you.

When migrating from an existing domain, however, it's not possible for us to provide the necessary validations, unless you decide to incur in a small amount of downtime.

You may use your old SSL certificates, buy a new one, or if your hosting provider supports it, you can use Let's Encrypt to issue you a free SSL certificate for your site.

To add the certificate, you will need three files: the key (\`example.ai.key\` below), certificate (\`example.ai.crt\`) and chain file (\`ssl_provider.crt\`). These are be provided to you when purchasing the SSL cert.

To add your SSL certificate to be used for your domain, use the following command:

${
  <TerminalInput>
    now certs --key example.ai.key --crt example.ai.crt --ca ssl_provider.crt example.ai
  </TerminalInput>
}

Which will render something like this:

${
  <TerminalOutput>
    &gt; Success! Certificate entry example.ai (vDKECujW1pNt8O2HbWXp) created [598ms]
  </TerminalOutput>
}

### 3.1. Add an Alias

For the incoming traffic for your domain to be routed to your new deployment, we need to add an alias for your domain to the deployment:

${
  <TerminalInput>
    now alias my-deployment-eyhxcwtevc.now.sh example.ai
  </TerminalInput>
}

Which will result in:

${
  <TerminalOutput>
    <pre>
      {`> example.ai is a custom domain.
> Verifying the DNS settings for example.ai (see https://zeit.world for help)
> Verification OK!
> Success! Alias created (20eTbYba9wFNXfPODBxfMKVI):
https://example.ai now points to https://my-deployment-eyhxcwtevc.now.sh
(erwXnGEkDxAJQfCKTE3HFp3A) [copied to clipboard]`}
    </pre>
  </TerminalOutput>
}

### 4. Update DNS Records

So far none of our changes have affected traffic to your site. Now we may finally flip the switch and point the DNS records to your recent now deployment.

For the apex domain (e.g.: \`example.ai\`, the domain name without \`www\`) you need to add an \`ALIAS\` or \`ANAME\` record pointing to \`alias.zeit.co\`.

If your DNS of choice doesn't support those record types, you might temporarily resolve \`alias.zeit.co\` and use one of the returned IP addresses. Please note that those might stop working after a while, so don't rely on them as a long-term solution. After you transition, make sure to move your DNS to zeit.world as outlined in the last few steps.

If your desired name is a subdomain instead, you need to add a \`CNAME\` record pointing to \`alias.zeit.co\`.

As DNS changes begin to propagate, your site should now be working!

## After You Migrate

Once the migration is completed, and everything is working perfectly, we need to do a few more steps to ensure everything will continue to work on correctly.

### 5. Set Up Automatic SSL Certificate Renewal

If you performed the zero downtime migration from your existing host to now, you must have added an external SSL certificate. With the external cert, however, you do not have the benefit of automatic renewals.

To issue a free certificate that we manage and auto-renew, just run:

${
  <TerminalInput>
    now cert renew example.ai
  </TerminalInput>
}

Make sure to run that command for all your other domains and subdomains.

### 6. Use zeit.world Nameservers

To get all the benefits of the now workflow, we suggest using our DNS service ${<InternalLink href="/world">zeit.world</InternalLink>}, optimized for both a great developer experience and fast lookup times.

The best way to transition to it while preserving 100% uptime is to manually initialize the same DNS records that your external DNS currently has.

For \`example.ai\` we will run:

${
  <TerminalInput>
    now dns add example.ai @ ALIAS alias.zeit.co
  </TerminalInput>
}

And for a subdomain we would run:

${
  <TerminalInput>
    now dns add www.example.ai CNAME alias.zeit.co
  </TerminalInput>
}

After that, simply update your domain's settings to point to any of our ${<InternalLink href="/world#1.-point-your-domains-to-our-nameservers">nameservers</InternalLink>} and the migration will be complete!
`)
