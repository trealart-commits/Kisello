# Kisello

Site for Kisello.PRO.

Current state: temporary placeholder page with the saved garden-care image.

## Local preview

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deployment

The repository includes a GitHub Actions workflow template for SFTP deployment to Timeweb.
Fill these repository secrets before enabling automated deploy:

- `TIMEWEB_HOST`
- `TIMEWEB_USER`
- `TIMEWEB_PASSWORD`
- `TIMEWEB_TARGET`

`TIMEWEB_TARGET` should be the document root for the domain, for example:
`/home/c/cs57897/example.com/public_html`
