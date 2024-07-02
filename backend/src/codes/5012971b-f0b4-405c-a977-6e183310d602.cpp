#include <bits/stdc++.h>
using namespace std;
#define ll long long int

int main()
{

    int t;
    cin >> t;
    while (t--)
    {
        ll n, k;
        cin >> n >> k;
        cout << (n - 1) * k + 1 << endl;
    }
    return 0;
}
