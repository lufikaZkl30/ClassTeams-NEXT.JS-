module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// ✅ Next.js 14+ Middleware Matcher Configuration
export const config = {
  matcher: ["/", "/dashboard", "/auth/:path*"],
};