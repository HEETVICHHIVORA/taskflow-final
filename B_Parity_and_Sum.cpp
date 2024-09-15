#include <iostream>
#include <vector>
#include <algorithm>  // For sort
using namespace std;

#define ll long long

// Solve function takes vectors by reference to avoid unnecessary copying
int solve(vector<ll>& even, vector<ll>& odd) {
    if (odd.empty()) {
        return 0;  // Edge case: No odd numbers
    }
    
    ll mx = odd.back();
    ll n1 = even.size();
    int ans = 0;

    for (int i = 0; i < n1; i++) {
        if (even[i] > mx) {
            return n1 + 1;
        } else {
            ans++;
            mx += even[i];
        }
    }
    
    return ans;
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        vector<ll> even, odd;
        for (int i = 0; i < n; i++) {
            if (a[i] % 2 == 0) 
                even.push_back(a[i]);     
            else 
                odd.push_back(a[i]);
        }

        if (odd.empty() || even.empty()) {
            cout << 0 << endl;
            continue;  // Continue to the next test case
        }

        sort(odd.begin(), odd.end());
        sort(even.begin(), even.end());

        ll ans = solve(even, odd);
        cout << ans << endl;
    }

    return 0;
}
