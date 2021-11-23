
VIRTUAL_HOST_DOMAIN=".app.localhost"
VIRTUAL_HOST_PORT=80
BONITA_HOST="http://127.0.0.1"
BONITA_PORT=8081
APACHE_LOG_DIR="/var/log/apache2"



echo "Me paso a root para tirar todos los comandos de una"


echo "instalo apache y habilito proxy y headers"
sudo apt install -y apache2
sudo a2enmod proxy proxy_http headers rewrite


echo "armando archivo de configuracion del virtualhost"


cat <<EOT >> /tmp/proxy.conf

<VirtualHost *:$VIRTUAL_HOST_PORT>
    ServerAlias app.bonita.com
    ServerAdmin bonita@localhost
    ServerName $VIRTUAL_HOST_DOMAIN   
    ErrorLog ${APACHE_LOG_DIR}/error-bonita.log
    CustomLog ${APACHE_LOG_DIR}/access-bonita.log combined

    # RewriteEngine On
    # RewriteCond %{REQUEST_METHOD} OPTIONS
    # RewriteRule ^(.*)$ $1 [R=200,L]

    Header always set Access-Control-Allow-Origin "http://app.bonita.com:3001"
    Header always set Access-Control-Allow-Headers "x-bonita-api-token"
    Header always set Access-Control-Allow-Methods "GET"
    Header always set Access-Control-Expose-Headers "Content-Security-Policy, Location"
    Header always set Access-Control-Max-Age "600"

    Header always set Access-Control-Allow-Credentials: true

    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]

    # Header add Access-Control-Allow-Origin "*"
       
    ProxyRequests Off

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyPass / http://127.0.0.1:8081/
    ProxyPassReverse / http://127.0.0.1:8081/

    <Location />
        Order allow,deny
        Allow from all
    </Location>

    # RewriteEngine  on
    # RewriteRule    "^(?!/bonita)(.*)$"  "/bonita$1" [R,L]
    # RewriteRule    "^/(.*)"  "$BONITA_HOST:$BONITA_PORT/$1" [P]


    Header add Access-Control-Allow-Origin "*"
       
    ProxyRequests Off

    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyPass / $BONITA_HOST:$BONITA_PORT/
    ProxyPassReverse / $BONITA_HOST:$BONITA_PORT/

    <Location />
        Order allow,deny
        Allow from all
    </Location>

</VirtualHost>


EOT

sudo mv /tmp/proxy.conf /etc/apache2/sites-available/proxy.conf
echo "habilito el virtualhost y reinicio"
sudo a2ensite proxy.conf
sudo a2dissite 000-default.conf
sudo systemctl restart apache2
echo "Ahora en el host $VIRTUAL_HOST_DOMAIN:$VIRTUAL_HOST_PORT quedó el proxy que escucha requests de la API (que está en el $BONITA_HOST:$BONITA_PORT). React debería pegarle a $VIRTUAL_HOST_DOMAIN:$VIRTUAL_HOST_PORT"





# <VirtualHost *:80>
#     ServerAlias app.bonita.com
#     ServerAdmin bonita@localhost
#     ServerName app.bonita.localhost   
#     ErrorLog /var/log/apache2/error-bonita.log
#     CustomLog /var/log/apache2/access-bonita.log combined

#     # RewriteEngine  on
#     # RewriteRule    "^(?!/bonita)(.*)$"  "/bonita" [R,L]
#     # RewriteRule    "^/(.*)"  "http://127.0.0.1:8081/" [P]

#     # RewriteEngine On
#     # RewriteCond %{REQUEST_METHOD} OPTIONS
#     # RewriteRule ^(.*)$ $1 [R=200,L]

#     Header always set Access-Control-Allow-Origin "http://app.bonita.com:3001"
#     Header always set Access-Control-Allow-Headers "x-bonita-api-token"
#     Header always set Access-Control-Allow-Methods "GET"
#     Header always set Access-Control-Expose-Headers "Content-Security-Policy, Location"
#     Header always set Access-Control-Max-Age "600"

#     Header always set Access-Control-Allow-Credentials: true

#     RewriteEngine On
#     RewriteCond %{REQUEST_METHOD} OPTIONS
#     RewriteRule ^(.*)$ $1 [R=200,L]

#     # Header add Access-Control-Allow-Origin "*"
       
#     ProxyRequests Off

#     <Proxy *>
#         Order deny,allow
#         Allow from all
#     </Proxy>

#     ProxyPass / http://127.0.0.1:8081/
#     ProxyPassReverse / http://127.0.0.1:8081/

#     <Location />
#         Order allow,deny
#         Allow from all
#     </Location>

# </VirtualHost>



# <VirtualHost *:$VIRTUAL_HOST_PORT>
#     ServerAdmin bonita@localhost
#     ServerName $VIRTUAL_HOST_DOMAIN   
#     ErrorLog ${APACHE_LOG_DIR}/error-bonita.log
#     CustomLog ${APACHE_LOG_DIR}/access-bonita.log combined

#     RewriteEngine  on
#     RewriteRule    "^(?!/bonita)(.*)$"  "/bonita$1" [R,L]
#     RewriteRule    "^/(.*)"  "$BONITA_HOST:$BONITA_PORT/$1" [P]


#     Header add Access-Control-Allow-Origin "*"
       
#     ProxyRequests Off

#     <Proxy *>
#         Order deny,allow
#         Allow from all
#     </Proxy>

#     ProxyPass / $BONITA_HOST:$BONITA_PORT/
#     ProxyPassReverse / $BONITA_HOST:$BONITA_PORT/

#     <Location />
#         Order allow,deny
#         Allow from all
#     </Location>

# </VirtualHost>