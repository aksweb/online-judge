// ABHISHEKH786 RGIPT
#include <bits/stdc++.h>
#define ll long long int
using namespace std;

#define gcd __gcd
#define br << endl
// #define cin cin>>
// #define cout cout<<
#define pii pair<int, int>
#define pll pair<ll, ll>
#define ss second
#define ff first
#define mkp make_pair
#define vi vector<int>
#define vl vector<ll>
#define all(v) v.begin(), v.end()
#define size(v) v.size()
#define pb push_back
#define si set<int>
#define sl set<ll>
#define rep(i, n) for (ll i = 0; i < n; i++)
#define repi(i, m, n) for (int i = m; i < n; i++)

#define loop(i, a, b) for (ll i = a; i < b; i++)
#define rloop(i, a, b) for (ll i = a; i > b; i--)
#define trav(a, b) for (auto a : b)
#define MOD 1000000007
#define MOD2 629421302
#define INF 1000000000000000000
int main()
{
    int t;
    cin >> t;
    while (t)
    {
        int n;
        cin >> n;
        int a[n];
        int mini = INT_MAX;
        int ans = 1;
        int pos = 0;
        rep(i, n)
        {
            cin >> a[i];
            if (mini > a[i])
            {
                pos = i;
                mini = a[i];
            }
        }

        a[pos] += 1;
        rep(i, n) ans *= a[i];
        cout << ans br;

        t--;
    }

    return 0;
}