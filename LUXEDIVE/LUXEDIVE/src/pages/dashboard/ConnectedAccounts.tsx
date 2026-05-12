
import { useState } from 'react'
import { Check, Shield, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export default function ConnectedAccounts() {
  const [accounts, setAccounts] = useState([
    { id: 'google', name: 'Google', icon: 'G', connected: true, email: 'luxedive.user@gmail.com' },
    { id: 'apple', name: 'Apple', icon: '', connected: false, email: null },
    { id: 'linkedin', name: 'LinkedIn', icon: 'in', connected: false, email: null },
  ])

  const toggleConnection = (id: string) => {
    setAccounts(accounts.map(acc => {
      if (acc.id === id) {
        return {
          ...acc,
          connected: !acc.connected,
          email: !acc.connected ? 'user@example.com' : null
        }
      }
      return acc
    }))
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-luxe-white mb-2">Connected Accounts</h1>
        <p className="text-luxe-gray">Manage your social login methods for seamless access. Link your trusted accounts to sign in with a single click.</p>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <Card key={account.id} className="bg-luxe-dark/40 border-luxe-gray/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl font-bold text-white border border-white/10">
                {account.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{account.name}</h3>
                {account.connected ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Connected as {account.email}
                  </div>
                ) : (
                  <span className="text-luxe-gray text-sm">Not connected</span>
                )}
              </div>
            </div>

            <Button
              variant={account.connected ? "outline" : "primary"}
              className={account.connected ? "border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 w-full md:w-32" : "bg-white text-black hover:bg-gray-200 w-full md:w-32"}
              onClick={() => toggleConnection(account.id)}
            >
              {account.connected ? 'Unlink' : 'Link Account'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-luxe-blue/10 border border-luxe-blue/20 rounded-xl p-6 flex items-start gap-4">
        <div className="p-2 bg-luxe-blue/20 rounded-lg text-luxe-blue shrink-0">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-white font-medium mb-1">One-Click Login Safety</h4>
          <p className="text-sm text-luxe-gray/80 leading-relaxed">
            Connecting your social accounts allows for quicker login. LUXEDIVE uses bank-grade encryption and will never post to your social profiles without your explicit permission.
          </p>
        </div>
      </div>
    </div>
  )
}
