export const jwtSnippets = {
  jwtService: `@Service
public class JwtService {

  @Value("\${jwt.secret}")
  private String secretKey;

  @Value("\${jwt.expiration:900000}") // 15 min
  private long accessExpiration;

  public String generateAccessToken(UserDetails user) {
    return Jwts.builder()
      .subject(user.getUsername())
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + accessExpiration))
      .signWith(getSigningKey())
      .compact();
  }

  public boolean isTokenValid(String token, UserDetails user) {
    final String username = extractUsername(token);
    return username.equals(user.getUsername()) && !isTokenExpired(token);
  }

  private SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}`,

  testAuth: `// Simulated auth test
const mockResponse = {
  accessToken: "eyJhbGc...",
  expiresIn: 900
};

console.log("Access token received:", mockResponse.accessToken.substring(0, 20) + "...");
console.log("Expires in:", mockResponse.expiresIn / 60, "minutes");
console.log("Status: Auth working correctly ✓");`,
}