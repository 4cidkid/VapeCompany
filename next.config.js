/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol: "https",
            hostname:"cdn.nicotordev.com",
            port: "",
            pathname: "/files/*"
        }]
    }
}

module.exports = nextConfig
