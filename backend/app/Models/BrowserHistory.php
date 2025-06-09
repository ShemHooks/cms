<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BrowserHistory extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'child_id',
        'url',
        'title',
        'visited_at',
    ];

    /**
     * Get the child user this browser history belongs to.
     */
    public function child()
    {
        return $this->belongsTo(User::class, 'child_id');
    }
}
